---
layout: post
title: "Feature Flags: Get your code out now - Part 2"
comments: true
---

## Implementing Feature Flags

In the previous post, [Feature Flags - Part 1]({% post_url 2017-20-30-Feature-Flags-Part-1 %}), we learned about what feature flags are, their benefits and dangers. This post will explain how you can implement feature flags in to your own applications.

Implementing feature flags requires you to create a divergence in your logic where the new functionality will be called, rather than modifying the existing functionality to meet the requirements of the new feature.



```typescript
constructor(private ff: FeatureFlagService, private http: Http) {
    this.useWebApi = ff.flags['ln-api'];

    this._subscription = ff.flagChange.subscribe((flags) => {
        this.useWebApi = flags['ln-api'];
    });
}

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

At this divergence we create a decision point 

[Sample code](https://github.com/OnyxPrime/FeatureFlagsDemo)

