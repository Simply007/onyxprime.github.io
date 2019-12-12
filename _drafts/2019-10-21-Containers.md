---
layout: post
title: <WORKING> Containers! What's it all about?
comments: true
---

For the past few months, I've been exploring containers for both personal and professional uses. 

## What are containers?
Software containers, like the packaging and shipping containers we're all familiar with, contains everything a piece of software needs to run, sandboxing it from other applications and processes. When an application is containerized, it's code, depenencies, such as the runtime, system level libraries.

Now, you might be thinking, like I was when I started investigating containers, "how is this different than a virtual machine?" 

<_image of container vs VM here_>
{% include image.html
            img="assets/post_images/feature-flag-scenarios.png"
            title="Feature Flag Scenarios"
            caption="Feature Flag Scenarios" %}

Containers, unlike a virtual machine, don't contain a copy of the operating system upon which it is run. This abstraction allows multiple containers, and multiple instances of a container, to be run on top of a single operating system.

## What are benefits of a container?
Now that we understand what a container is, let's look at some benefits to containerizing an application. 
- Isolation
- Consistency among environments
- Run anywhere
- Security

## What is Docker?
Docker is a company providing a full suite of tools for creating and managing containers. While they didn't come up with the concept of containers, their container management eco-system has surely helped increase its popularity. 

- **Docker Engine** is the runtime used to create and manage containers.
- **Docker Registries** store container images. Docker Hub is a popular public registry available to everyone. It allows anyone, or organization, to share container images they've created. Docker Hub also provides the ability to create and run private registries.
- **Docker Compose** is an orchestration tool used to define and run multiple containers. 

To get started with Docker, visit https://hub.docker.com/ and download the appropriate version for your environment and checkout the [quickstart](https://docs.docker.com/get-started/).

## How to create a container
Once you have Docker setup on your system, creating a container is a 3 step process:
- Define container image
- Generate container image
- Create container instance from a container image

### Defining container image
The definition for a container image is a text (.txt) file containing the instructions/commands used to create the final image. The Docker Engine looks for a specific file named ```Dockerfile``` with no file extension. 

If you're using Visual Studio to develop your application, adding Docker support can be done through the context menus in the Solution Explorer tab.

Right-click project -> Add -> Add Docker Support

<_Image of VS context menu_>

Visual Studio attempt to determine the best image definition by looking at the project type and build properties for the project.

### Generate the container image
To generate a container image from the definition we previously created, running the following command from the command-line.

```
$ docker build -t <image_name>:<tag> .
```

This creates a container image within the local environment. From here you can push the file to a remote registry, or create and run an instance of the container locally.

### Create a container instance from a container image

To create and run an instance of the container image we built in the previous step, run the following command from the command-line.

```
$ docker run -p 8000:8080 -d --name <instance_name> <image_name>:<tag>
```

To verify the container is running, run the following commmand from the command-line

```
$ docker ps
```
<_image of command run above_>

