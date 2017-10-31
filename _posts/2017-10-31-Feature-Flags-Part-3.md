---
layout: post
title: "Feature Flags: Get your code out now - Part 3"
comments: true
---

### Implementing Feature Flags Server-side

* [Feature Flags - Part 1 (Overview)]({% post_url 2017-10-30-Feature-Flags-Part-1 %})
* [Feature Flags - Part 2 (Client-side implementation)]({% post_url 2017-10-30-Feature-Flags-Part-2 %})
* Feature Flags - Part 3 (Server-side implementation)

[Sample code](https://github.com/OnyxPrime/FeatureFlagsDemo)

The previous posts described what Feature Flags are, their benefits, their dangers and how to implement them in your client side code. While stopping the user from seeing the new feature in the client application, or preventing the new workflow from being accessed by the client, this doesn't completely prevent a sinister individual from accessing the underlying calls being made to systems outside the client application. This is why we must also protect changes to the systems outside our client application being modified for the new feature.

In the example below, we look at how we can utilize the same feature flags we created for our client-side application to protect our backend, server-side API. The code is a .Net Core Web API written in C#. The full application can be downloaded and accessed from the link above.

Like our client-side application, I recommend creating an application specific wrapper around the feature flag service to decouple the service provider from the applcation.



