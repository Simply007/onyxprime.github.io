---
layout: post
title: Getting started with Kentico EMS using Docker
comments: true
---

>**Looking to get started with Kentico EMS, but not quite sure where to begin? Hesitant on installing another piece of software for testing? Want to test the latest update? We've got you covered! Utilizing Docker, you can configure and run a complete Kentico EMS environment with a few commands.**

## Pre-requisites to getting started
- Download and install [Docker Desktop](https://docs.docker.com/get-started).
- Clone, or copy, the [Docker compose file](https://github.com/OnyxPrime/kentico-ems-docker-poc/blob/master/docker-compose.yml) we'll use to create the Kentico EMS environment.

>_At this time this can only be done on a Windows machine_

## Why Docker?
When .NET Core was released, I began a big fan immediately for one primary reason. I was able to run multiple versions side-by-side, but this is something most applications we use today don't support. As a developer, I tend to push towards the leading edge of technology. This has it's benefits, you get to try the latest and greatest, and it's drawbacks, you tend to get cut. This is where Docker comes in to play.

Docker provides us a way to create an environment, isolated from the rest of our system, with all dependencies and libraries needed to run our applications. And when we're done with this environment, we can turn it off and reclaim any resources it was consuming. This also means we can run multiple versions of the same application side-by-side.

## Containerizing Kentico EMS
As part of of my on-boarding process with Kentico, I walked through the installation and configuration process for Kentico EMS. This process has several installation requirements, such as turning on IIS and setting up SQL Server Express. 

## How to start up the Kentico EMS environment

Once the pre-requisites are completed, open your preferred command-line utility. Change to the directory where you cloned, or copied, the file listed in the pre-requisites. Starting up the environment is running a single command from a command-line.
```PowerShell
$ docker-compose -f .\docker-compose.yml up -d
```
We're using the following parameters with the `docker-compose` command:
- `-f .\docker-compose.yml` specifies the configuration for the Kentico environment
- `up` tells Docker compose to bring up the environment
- `-d` tells Docker compose to run in a detatched state 


{% include image.html
            img="assets/post_images/kentico_docker_poc/docker_compose_up.png"
            title="Running Docker Compose"
            caption="Running Docker Compose" %}

If you receive an error while running the Docker compose command, there a couple of possible reasons.

1. The host ports specified in the `docker-compose.yml` file are be used by another application or service.

2. There are old containers still using the network. Run `docker ps -a` to see if there are any containers remaining. If there are, run `docker-compose down` to remove the old Kentico containers.

Once the Kentico container environment is running, open a browser and navigate to `http://localhost:60051/Kentico12_Admin`

When you first navigate to the page, the license for Kentico EMS will be expired. To renew the license, navigate to `https://www.kentico.com/download-demo/testversion/trial-extend` to request a new license. 

{% include image.html
            img="assets/post_images/kentico_docker_poc/install_key.png"
            title="Invalid license key"
            caption="Invalid license key" %}

The current process can take up to 48-hours to get a new license, but we are currently working on a solution to reduce this time.

## Updating your license

Once you obtain an updated license, go to http://localhost:60051/Kentico12_Admin/Admin/cmsadministration.aspx and login to the administration portal. Enter _`Administrator`_ in the `User name` field. Leave the `Password` field blank and click the `Sign in` button.

{% include image.html
            img="assets/post_images/kentico_docker_poc/admin_login.png"
            title="Administrator login"
            caption="Administrator login" %}

You should be taken to the page where you can enter a new license. If you are not, you can navigate to http://localhost:60051/Kentico12_Admin/Admin/cmsadministration.aspx#69d69d2d-6d4e-40ef-9ce1-97d628083898. Click the `New license` button in the upper left part of the page, paste the license key in to the box and then click the `Save` button.

This should unlock the full features of the Kentico EMS solution.

## Breaking down the Docker Compose file

Now that we have the Kentico EMS solution up and running, let's take a look at how the environment is constructed.

The first line of the file tells Docker compose what version, or format, the file follows.
```
version: '3.4'
```

Next, we define the various services, or container images, we want to instantiate.
```
services:
  web:
    image: kentico/ems:web-12.0-beta
    ports:
      - 60051:80
    links:
      - sql
    depends_on:
      - sql    

  sql:
    image: kentico/ems:db-12.0-beta
    ports:
      - 1435:1433
```

In the code above, we are creating 2 containers. Container 1, called `web`, contains an instance of IIS hosting Kentico 12 EMS. The `image` property defines the specific image in Docker Hub we are pulling down and instantiating with Docker Compose. The `ports` property defines the mapping of internal container ports to host ports. The IIS image we are using runs off port 80, but we are mapping it to a host port 60051. We are doing this to prevent conflicts from IIS potentially running on our local machine. Kentico EMS uses a Microsoft SQL Server database as its data store and so we need to ensure the SQL Server container is running before we can start the web container. The `depends_on` property allows you to define a service which must be running before this service can be start and we tell Docker Compose to wait for the `sql` container to start before starting the `web` container.

Container 2, called `sql`, contains an instance of Microsoft SQL Server Express and the Kentico 12 EMS database installed. We have mapped the normal SQL Server port 1433 to 1435, again, to prevent conflicts with any other installation of Microsoft SQL Server installed on our local machine.

