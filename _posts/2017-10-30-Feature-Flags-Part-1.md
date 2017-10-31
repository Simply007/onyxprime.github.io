---
layout: post
title: "Feature Flags: Get your code out now - Part 1"
comments: true
---

* Feature Flags - Part 1 (Overview)
* [Feature Flags - Part 2 (Client-side implementation)]({% post_url 2017-10-30-Feature-Flags-Part-2 %})
* Feature Flags - Part 3 (Server-side implementation)

As many teams and organizations begin to transform the way they plan, build and deliver software, as well as, obtain feedback and iterate, they begin to adopt new practices to aide in this transformation. Automating build and release pipelines has increased the efficiency and stability of releasing our software, but how can we ensure we can continually release and deliver new features and fixes without destabalizing the entire application. This is where feature flags come in to play.

Most of us have most likely used feature flags previously, we just never called it a feature flag. A Feature Flag is simply a way to turn functionality on or off, most likely through a configuration setting, without the need to deploy new code. To utilize the feature flag, we create a divergence in our code, directing users down the new path or the old path based on the flag setting, rather than replacing the existing logic. We'll explore this more in the implementation section in [part 2]({% post_url 2017-10-30-Feature-Flags-Part-2 %}) of this post.

## Benefits of feature flags

Decoupling the feature release from code deployment through feature flagging, reduces the risk of breaking the existing production application and allows us to continually provide bug/hotfixes to our customers at a regular interval.

Another benefit to using feature flags is the ability to turn on a new feature with a simple flip of a flag, allowing the feature to be launched whenever the prodcut owner or primary stakeholder deem it complete, or complete enough, or on a specfic product launch timeline. 

The type of feature flag we've been talking about up to now has been a simple on/off flag. Flags also have the ability to target specific individuals, or geographical locations. With this added flexibility, we can now begin to release our features to users for beta testing, customer/stakeholder feedback, production load testing, percentage based roll-out or pay-per-feature functionality.

In the past, if we wanted to give our customers/users early access to a feature, we'd spin up new infrastucture for the new beta site and although new tooling has made it easy to replicate an environment, we're now incurring the cost of a separate set of infrastucture. With the feature flag approach, we would add our users to a whitelist activating the feature for them inside our existing infrastructure, reducing the number of environments we manage. This also has the added benefit of being able to perform A/B, or blue/green, to test a new workflow and measure the result without affectingyour entire customer base and then turn off, or on, the new flow based on the results.

And when you're ready to roll your new feature to production, but are worried your new feature and current infrastrcture might not support a full production rollout, you can utilize the same functionality used during A/B testing and slowly roll the new feature out to all your customers.

One of the great success stories I've heard of using feature flags is Facebook's messaging feature. Long before it was exposed to the public, Facebook was testing its messaging functionality evertyime a user visited it's page. It would take a small subset of your friends, send them a message, and then expect to get a response from a percentage of the messages sent. This allowed them to gain feedback on how the messaging system was performing, as well as, identify weak points in the design. Then when they decided to launch the messaging functionality, they flipped a flag and users were immediately able to use the new feature.

## Dangers

With all the benefits we gain from utilizing feature flags, comes great responsibility. There are a couple of notable dangers you should be aware of when implementing feature flags. As teams begin to utilize feature flags, the amount of technical debt in the application starts to grow. This technical debt is in the form of unused code, or code bloat. To combat this issue, when your new feature gains 100% usage and is deemed stable, the next iteration should remove the unused code.

One way I've seen suggested is to create a parallel branch with the code being replaced removed. The idea is the developers have intimate knowledge of the code being replaced and is the ideal time to remove it. When the code reaches 100% usage then you merge the "clean" code into the main branch. This does require you to maintain 2 code bases until the feature has reached entropy.

Another danger is feature flag reuse. You should never reuse a previously used feature flag because you could accidentally turn on a previously deprecated feature, or poor performing feature, which may have not been properly removed. Knight Capital, a trading firm managing billions of trades worth billions of dollars... daily. They were in the process of replacing the existing engine, deploying the new code manually to their servers (8 in all) over a 5 day period. Unfortunately, the one of the servers was missed and still contained the old code. When the flag was triggered, 7 of the servers functioned as expected and the 8th server began running the deprecated code. In about 45 minutes, the company incurred a $465 million loss and with only $365 million in cash and equivalents, became bankrupt. Read [Knightmare: A DevOps Cautionary Tale](https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/) to learn more about the incident and some lessons learned.

The reason I mention the Knight Capital incident is not to scare you away from feature flags, but to bring to light the need and importance of managing our technical debt in a timely manner. It is important to also understand any code change could experience this type of incident if we don't manage our technical debt.

Some of the feature flagging services, like [LaunchDarkly](https://launchdarkly.com), provide the ability to show when a flag is ready for removal by showing when all users are receiving the same flag value.

## Build vs. Buy

While building a simple feature flag system isn't overly complex, you need to ask yourself what business do you want to be in and estimate the cost accordingly. Maintaing your own system means as business changes, upgrades may be necessary and accounted for with new initiatives and development language support. 

I would recommend starting out with one of a SaaS provider and down the road reevaluate this decision if the need arises for additional functionality. You may be able to partner with the SasS provider to get this new functioanlity, saving the costs of an internal system.

Check out [Feature Flags - Part 2]({% post_url 2017-10-30-Feature-Flags-Part-2 %}) to learn how to implement feature flags.