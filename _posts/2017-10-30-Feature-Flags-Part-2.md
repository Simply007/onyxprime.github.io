---
layout: post
title: "Feature Flags: Get your code out now - Part 2"
comments: true
---

### Implementing Feature Flags Client-side

* [Feature Flags - Part 1 (Overview)]({% post_url 2017-10-30-Feature-Flags-Part-1 %})
* Feature Flags - Part 2 (Client-side implementation)
* [Feature Flags - Part 3 (Server-side implementation)]({% post_url 2017-10-31-Feature-Flags-Part-3 %})

[Sample code](https://github.com/OnyxPrime/FeatureFlagsDemo)

In the previous post, [Feature Flags - Part 1]({% post_url 2017-10-30-Feature-Flags-Part-1 %}), we learned about what feature flags are, their benefits and dangers. This post will explain how you can implement feature flags in to the client-side of your own applications.

Implementing feature flags requires you to create a divergence in your logic where the new functionality will be called, rather than modifying the existing functionality to meet the requirements of the new feature.

{% include image.html
            img="assets/post_images/feature-flag-scenarios.png"
            title="Feature Flag Scenarios"
            caption="Feature Flag Scenarios" %}


At this divergence we create a decision point, which redirects the users flow through the application based on the value of the feature flag. In the image above, I show 3 code flows. The first is the current path. The second is a simple decision point where we have an entirely new flow which does not reuse any previous code. The third shows a more complex flow where we reuse some code, business logic perhaps, and have more than one decision point, as the flow progresses.

The sample code below uses a flag to determine whether or not to call a web API to retrieve a list of characters, or return a static list of predefined characters. Although the code is written in TypeScript, the concepts can be carried on to other client-side languages.

```typescript
getAllCharacters(): Observable<string[]> {
    if (this.useWebApi) {
        return this.http.get(this.ninjasUrl)
                .map((res: Response) => res.json())
                .catch(this.handleError);
    } else {
        return Observable.of(this.characters);
    }
}
```

To decouple the client-side code from a specific feature flag service, I like to wrap it in an application level service, as seen below. This provides the ability to swap out the feature flag provider at any point. Below is the complete feature flag service.

```typescript
export class FeatureFlagService {
  ldClient: any;
  flags: any;
  flagChange: Subject<Object> = new Subject<Object>();
  constructor() {

    this.flags = {'ln-search': false, 'ln-api': false};

    this.ldClient = LDClient.initialize('<LaunchDarkly_api_key>',
      {key: 'generic_user_id', anonymous: true });

      this.ldClient.on('change', (flags => {

        if (flags['ln-search'] !== undefined) {
          this.flags['ln-search'] = flags['ln-search'].current;
        }
        if (flags['ln-api'] !== undefined) {
          this.flags['ln-api'] = flags['ln-api'].current;
        }

        this.flagChange.next(this.flags);
      }));

      this.ldClient.on('ready', () => {
        this.setFlags();
      });
    };

    setFlags() {
      this.flags = this.ldClient.allFlags();
      this.flagChange.next(this.flags);
    };

    changeUser(user) {
      if (user !== 'Anonymous') {
        this.ldClient.identify({key: user, name: user, anonymous: false});
      } else {
        this.ldClient.identify({key: 'anon', anonymous: true});
      }
    };
  }
```

Let's break down the above service and look at the individual pieces. With feature flags, we want to be as explicit as possible when implementing them in order to ensure clear understanding of what the code is doing. The code below defines the explicit flags we care about and defaults them to false. This prevents any accidental release of features before the application can get the actual values from the service provider.

```typescript
this.flags = {'ln-search': false, 'ln-api': false};
```

We then initialize our connection to the feature flag service provider, as seen below. Here we are utilizing [LaunchDarkly](https://launchdarkly.com) as our service provider and configure it for an anonymouse user. If at the point of initialization, the user is know, then we would go ahead and pass it in to the service initialization.

```typescript
this.ldClient = LDClient.initialize('<LaunchDarkly_api_key>',
      {key: 'generic_user_id', anonymous: true });
```

If we intend to serve both unauthenticated and authenticated users, we can utilize the code below to change the user configured during initialization.

```typescript
changeUser(user) {
    if (user !== 'Anonymous') {
    this.ldClient.identify({key: user, name: user, anonymous: false});
    } else {
    this.ldClient.identify({key: 'anon', anonymous: true});
    }
};
```
Once our client is initialized, we want to ensure we call the service to obtain the correct value settings for our user, and notify any subscribers.

We define our event property to allow subscribers to be notified when flag values change.

```typescript
flagChange: Subject<Object> = new Subject<Object>();
```

Subscribe to the LaunchDarkly client's change notification and call the ```setFlags()``` method.

```typescript
this.ldClient.on('ready', () => {
    this.setFlags();
});
```

Inside ```setFlags()``` we want to get all flags for our client from the feature flag service and notify any subscribers there was a change in the flags value.

```typescript
setFlags() {
    this.flags = this.ldClient.allFlags();
    this.flagChange.next(this.flags);
};
```

We also don't want to require our users to refresh or restart the application in order to gain access to new features. We can subscribe to an event provided by our service provider, or if they don't provide this feature, implement polling logic to notify us when the value of a feature flag we care about changes, and notify any subscribers to our event.

```typescript
this.ldClient.on('change', (flags => {
    if (flags['ln-search'] !== undefined) {
        this.flags['ln-search'] = flags['ln-search'].current;
    }
    if (flags['ln-api'] !== undefined) {
        this.flags['ln-api'] = flags['ln-api'].current;
    }

    this.flagChange.next(this.flags);
}));
```

