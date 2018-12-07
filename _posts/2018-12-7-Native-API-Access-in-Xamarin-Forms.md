---
layout: post
title: Native API Access in Xamarin.Forms
comments: true
---

As mobile developers, our clients, be internal or external, want to be able to run their application on whatever device, or platform, that fits the business case within a specific budget. A cross-platform mobile development solution, such as Xamarin.Forms, affords them this flexibility. The Xamarin team does an excellent job staying up to date exposing the latest native API's as they're released. Unfortunately, with each platform vying for dominance in the market, there will be times when one platform will expose new functionality, the others do not.

Out of the box, Xamarin.Forms exposes most of the common controls to the cross-platform UI and with the release of the [Xamarin.Essentials](https://docs.microsoft.com/en-us/xamarin/essentials/) package, many of the common API's arre accesible from your cross-platform application. When a single platform releases a new API, not exposed by the others, and you're clients want you to implement it in their application, we don't have to wait for other platforms to catch-up, or separate our cross-platform application in to 2 separate Xamarin applications. Xamarin.Forms exposes a way for us to create our own interaction with platform native API's.

To show you how easy it is to access these native API's within a Xamarin.Forms application, we'll be utilizing [DependencyService](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/app-fundamentals/dependency-service/introduction). First, add a new .NET Standard library to the existing Xamarin.Forms application.

{% include image.html
            img="assets/post_images/2018_12_7/XplatApiDemoNewProject.PNG"
            title="Visual Studio New Project Window"
            caption="Visual Studio New Project Window" %}

Then add an interface describing the functionality you want to expose. For our example, we'll be adding Start, Stop, and IsAvailable methods and an event to allow us to be notified when the counter changes.

```csharp
public interface IStepCounter
{
    event StepCountChangedEventHandler StepCountChanged;

    void Start();

    void Stop();

    bool IsAvailable();
}
```

The reason we're adding an IsAvailable method is to give us a way to tell whether or not this sensor is available on the device. or platform, our application is running. This also provides the ability to hide any UI related to this sensor if it is not available. Also, we can inform the user the sensor is not available if it is a key piece of functionality for our application. 

We also need to add a delegate for our event and a class defining custom event arguments.

```csharp
public delegate void StepCountChangedEventHandler(Object sender, StepCountChangedEventArgs e);

public class StepCountChangedEventArgs : EventArgs
{
    public virtual double? Value { get; set; }

}
```

Now we need to define the platform specific implementation for our Step Counter for each platform, even if that platform doesn't expose the specific API we're implementing. We're doing this because want to ensure there is some level of implementation in all of our supported platforms to prevent any unexpected exceptions within our cross-platform logic. 

{% include image.html
            img="assets/post_images/2018_12_7/XplatApiDemoAndroidProject.PNG"
            title="Visual Studio Android Project"
            caption="Visual Studio Android Project" %}

Inside our Android project, we will add a new class and implement the interface we defined above.

```csharp
public class StepCounter_Android : Java.Lang.Object, ISensorEventListener, IStepCounter
{
    readonly SensorManager sensorManager;
    Sensor stepCounter;

    public StepCounter_Android() : base()
    {
        sensorManager = (SensorManager)Application.Context.GetSystemService(Context.SensorService);
        stepCounter = sensorManager.GetDefaultSensor(SensorType.StepCounter);
    }

    public event StepCountChangedEventHandler StepCountChanged;

    public void OnAccuracyChanged(Sensor sensor, [GeneratedEnum] SensorStatus accuracy)
    {
    }

    public void OnSensorChanged(SensorEvent e)
    {
        StepCountChanged(this, new StepCountChangedEventArgs { Value = e.Values[0] });
    }

    public void Start()
    {
        if (stepCounter != null)
        {
            sensorManager.RegisterListener(this, stepCounter, SensorDelay.Normal);
        }
    }

    public void Stop()
    {
        if (stepCounter != null)
        {
            sensorManager.UnregisterListener(this, stepCounter); 
        }
    }

    public bool IsAvailable() => stepCounter != null;        
}
```

The specific implementation defined will vary depending on the API being accessed. In our example, we're monitoring a hardware device sensor. In addition to implementing our custom interface, we imple the ISensorEventListener interface to allow our class to be used as a listener for sensor events. 

In the constructor, we grab a reference to the sensor manager and the sensor we're monitoring, specifically the StepCounter sensor. The Start and Stop methods register and unregister our class as a listener for events fired by the step counter sensor.

As discussed earlier, the IsAvailable method lets the cross-platform logic know whether or not this sensor is available on the device and platform currently running the application. In our case, if we are able to obtain a refernce to the sensor, then it is available on the device. Otherwise it will be null, indicating the sensor was not foundd on our device or platform.

Now that we have our implementation, we need to be able to get access to it in our cross-platform code. This is done by registering our implementation with DependencyService. Xamarin.Forms uses the service locator pattern to allow access to platform specific functionality. DependencyService is a service locator, which finds the correct implementation for the requested interface. 

Registration is done through a metadata attribute on the implementing class.

```csharp
[assembly: Dependency (typeof (StepCounter_Android))]
namespace XPlatApiDemo.Droid
{
    public class StepCounter_Android : Java.Lang.Object, ISensorEventListener, IStepCounter
    {
        ...
    }
}
```

Note: the metadata attribute is placed at the assembly level, not the class level

Once registered, we can now access the platform implementation from our cross-platform code. This utilizes the same DependencyService discussed above to pull out the platform specifc implementation.

```csharp
public partial class MainPage : ContentPage
{
    IStepCounter stepCounterService;
    public MainPage()
    {
        InitializeComponent();
        stepCounterService = DependencyService.Get<IStepCounter>();if (stepCounterService.IsAvailable())
        {
            stepCounterService.StepCountChanged += StepCounterService_StepCountChanged;
            stepCounterService.Start();
        }
        else
        {
            lblSteps.Text = $"Step counter sensor not available on this device";
        }
    }

    private void StepCounterService_StepCountChanged(object sender, StepCountChangedEventArgs e)
    {
        lblSteps.Text = $"Number of steps {e.Value}";
    }
}
```

In the code above, we're grabbing the platform specific implementation of our IStepCounter interface. If the sensor is available, we wire-up a delegate to the StepCountChanged event and call the Start method to begin montioring the sensor. When the step counter changes, we update a label on our screen to the new value.

If the step counter sensor is not available on our device or platform, we update the label to inform the user.

As you can see, accessing native API's not exposed across all platform's doesn't require deconstruction of your Xamarin.Forms application into platform specifc Xamarin applications. With a little extra code, we can still incorporate all the latest bits of functionality in our applications, even when it doesn't exist on all platforms, in our Xamarin.Forms applications.
<br/><br/><br/>

> Thank you to Matthew Groves putting together [The Second Annual C# Advent Calendar](https://crosscuttingconcerns.com/The-Second-Annual-C-Advent) and giving me the opportunity to contribute!

<br/>