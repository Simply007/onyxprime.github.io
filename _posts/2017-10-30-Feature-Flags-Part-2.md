---
layout: post
title: "Feature Flags: Get your code out now - Part 2"
comments: true
---

## Implementing Feature Flags

In the previous post, [Feature Flags - Part 1]({% post_url 2017-10-30-Feature-Flags-Part-1 %}), we learned about what feature flags are, their benefits and dangers. This post will explain how you can implement feature flags in to your own applications.

Implementing feature flags requires you to create a divergence in your logic where the new functionality will be called, rather than modifying the existing functionality to meet the requirements of the new feature.

{% include image.html
            img="assets/post_images/feature-flag-scenarios.png"
            title="Feature Flag Scenarios"
            caption="Feature Flag Scenarios" %}


At this divergence we create a decision point, which redirects the users flow through the application based on the value of the feature flag. 

The sample code below uses a flag to determine whether or not to call a web API to retrieve a list of characters, or return a static list of predefined characters.

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

To decouple the client-side code from a specific feature flag service, I like to wrap it in an application level service, as seen below. This provides the ability to swap out the feature flag provider at any point.

```typescript
export class FeatureFlagService {
  ldClient: any;
  flags: any;
  flagChange: Subject<Object> = new Subject<Object>();
  constructor() {

    this.flags = {'ln-search': false, 'ln-api': false};

    this.ldClient = LDClient.initialize(environment.LAUNCHDARKLY_ENV_ID,
      {key: environment.ANONYMOUS_USER_ID, anonymous: true });

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

[Sample code](https://github.com/OnyxPrime/FeatureFlagsDemo)

