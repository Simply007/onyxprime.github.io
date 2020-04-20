import React from "react"
import Layout from "../components/layout"

const About = () => (
    <Layout>                
        <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__inner"> 
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                    <h1 style={{fontWeight: `normal`, color: `#159957`}}>About me</h1>
                    <p>My name is Ryan Overton. I'm a software developer with 10 years of professional experience with Microsoft technologies. I have learned a breadth of development technologies for desktop (WinForms, WPF, UWA, and UWP), web (WebForms, MVC, AngularJs, and Angular), and mobile (Windows CE, Windows Mobile, Windows Phone 7/8/8.1, and Xamarin). I'm a proponent of cloud-based solutions, as well as, environments promoting agility, collaboration, innovation and failure as an option.</p>    
                </div>                           
                
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                    <p>Since I first made the turtle dance around the screen using Logo, I have had a passion for development and am fortunate I get to do what I love for a living. I'm fortunate enough to have the opportunity to be a remote worker and LOVE it!</p>
                </div>                           
                
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 mdc-layout-grid__cell--align-center">
                    <img style={{display:`block`, marginLeft: `auto`, marginRight: `auto`, marginBottom: '0', border: `none`}} src="./LogoWriter.png" alt="Image of LOGO programming screen" />
                    <p style={{textAlign: `center`, margin: `0`}}>Logo (http://www.chris-granger.com/2012/10/05/all-ideas-are-old-ideas/)</p>
                </div>                           
                
                <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                    <p>I love discussing technology and how it can make our lives better, as well as, experiment with new emerging technologies. If you ever want to chat, or need someone to bounce ideas against, hit me up at any of the links below!</p>
                </div>                           
                
            </div>
        </div>
    </Layout>
);

export default About;