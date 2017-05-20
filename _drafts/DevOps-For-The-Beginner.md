---
layout: post
title: TBD
comments: true
---

I just finished speaking at NWA TechFest over DevOps. I realized after my session, this is a huge topic and deserved a post.

TL;DR
DevOps is an essential process in developing a great product, fast and efficiently. 

### What is DevOps?

DevOps is described as the marrying between development and operations to deliver qualtiy products, faster. There are several practices essential to implementing a successful DevOps strategy.

* Agile
..* Continuous Planning
..* Continuous Development
..* Continuous Testing
* Continuous Integration
* Continuous Delivery
* Continuous Monitoring/Feedback

Last week, I was watching a talk by Bo-ying Fu, Program Manager at Microsoft, [Application Insights for developers: Integrating with your DevOps workflows](https://channel9.msdn.com/Events/Build/2017/T6008), and I think she described DevOps best as the **"Continuous Everything Lifecycle"**. Unlike other strategies, the practices listed above are all being done concurrently. While product managers, program/product owners analysts and leads are planning the next round of work, developers are working on new, or prepping for new features, testers are creating tests for, or testing completed development features, and support teams are providing feedback to owners and program/product managers. These are key to getting those features and fixes which are most important to your customers, or users, out quickly.

### What do I get out of DevOps?

There are many benefits, impacting all everyone in your business. Technical team members are happy because there solutions are less complex because it contains only what is needed. The delivery pipeline has been automated, allowing solutions to be quickly tested and deployed. Problems are resolved faster because the changes introduced are small making it easier to identify the issue.

Product owners and program/product managers are happy because those features that matter are being delivered quicker. When changes happen in the market, the team can quickly change course to match the market because the team completes development cycles sooner, weeks as opposed to months or years. Along with shorter development cycles comes smaller changesets, allowing for problems to be identified and resolved/reverted earlier without major outages. 

### How do I get started 

The million dollar question, how do I get started? While the DevOps process can seem overwhelming, it's not all or nothing. Starting with one of the practices listed earlier in the article, you can start reaping the rewards of DevOps. I recommend starting with implementing a continuous integration process. This will help to quickly resolve the "Works on my machine" issue I've found prevalent in the workplace today.

Contiuous Integration involves setting up source control and automatic code builds on a machine different than the machine the code was developed. This ensures anything done to get the application to run on the developers machine, exists in source control, and not solely on the developers machine. There are numerous times I've opened code developed by me, or someone else, which hasn't been touched in months or years, and spent numerous hours, or days, getting it to build because the previous developer built and deployed the application from there development machine.

Once you have the first practice implemented, move on to the next practice. Build upon your success with the first practice. Don't let the momentum on your DevOps journey slow, or halt. It will be that much harder to get the process started again. Evangelize your success with other groups. This will further drive the adoption of DevOps across your organization.

One of the more difficult practices I've found to implement, with management and teams, is Agile. Agile requires everyone to take everything they know about the software development process and flip it on its head. On the manaagement side, program/project managers, want to know when can we deliver each feature or product. Developers tend to over architect and build what's not needed, while Agile teaches you to write the minimum amount of code to implement the feature, YAGNI. 
