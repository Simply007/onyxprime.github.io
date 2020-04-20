import React from "react"
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <div className="mdc-layout-grid">
      <div className="mdc-layout-grid__inner"> 
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
            <h2 style={{color: `#159957`, fontWeight: `normal`, fontSize: `2rem`}}>Blog</h2>
            <ul style={{listStyleType: `none`, margin: `0`, padding: `0`}}>
              <li>
                  <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://www.meetup.com/TulsaDevelopers-net/events/cjkrmlyxmbhc/">Native API Access in Xamarin.Forms</a>
                  <p style={{fontSize: `.75rem`}}>December 7, 2018</p>
              </li>
              <li>
                  <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="http://techfests.com/Tulsa/2018/default.aspx">Feature Flags: Get your code out now - Part 2</a>
                  <p style={{fontSize: `.75rem`, color: `#0275d8`, textDecoration: `none`}}>October 30, 2017</p>
              </li>
              <li>
                  <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://www.kcdc.info/">Feature Flags: Get your code out now - Part 1</a>
                  <p style={{fontSize: `.75rem`}}>October 30, 20178</p>
              </li>
            </ul>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
          <h2 style={{color: `#159957`, fontWeight: `normal`, fontSize: `2rem`}}>Speaking</h2>
          <ul style={{listStyleType: `none`, margin: `0`, padding: `0`}}>
            <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://www.meetup.com/TulsaDevelopers-net/events/cjkrmlyxmbhc/">Tulsa .NET User Group</a>
                <p style={{fontSize: `.75rem`}}><i>Tulsa, OK</i>, September 25, 2018</p>
            </li>
            <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="http://techfests.com/Tulsa/2018/default.aspx">Tulsa TechFest</a>
                <p style={{fontSize: `.75rem`, color: `#0275d8`, textDecoration: `none`}}><i>Tulsa, OK</i>, July 20, 2018</p>
            </li>
            <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://www.kcdc.info/">KCDC X</a>
                <p style={{fontSize: `.75rem`}}><i>Kansas City, MO</i>, July 11-13, 2018</p>
            </li>
            <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://nwatechfest.com/">NWA TechFest</a>
                <p style={{fontSize: `.75rem`}}><i>Fayetteville, AR</i>, May 17, 2018</p>
            </li>
            <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://devupconf.org/">dev up</a>
                <p style={{fontSize: `.75rem`}}><i>St. Louis, MO</i>, October 16-18, 2017</p>
            </li>
            <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href="https://nwatechfest.com/">NWA TechFest</a>
                <p style={{fontSize: `.75rem`}}><i>Fayetteville, AR</i>, May 18, 2017</p>
            </li>
          </ul>
          </div>
        </div>                
      </div>
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <h2 style={{color: `#159957`, fontWeight: `normal`, fontSize: `2rem`}}>Live Stream</h2>
            <div>
              <p>Yep, you heard it right: I've started live streaming!</p>
              <p>We'll be exploring tools, technologies and practices used in software development to make developers more productive <b><i><u>LIVE!</u></i></b></p>
              <ul>
                  <li style={{marginBottom: `0`}}>Desktop</li>
                  <li style={{marginBottom: `0`}}>Web</li>
                  <li style={{marginBottom: `0`}}>Mobile</li>
                  <li style={{marginBottom: `0`}}>Cloud</li>
                  <li style={{marginBottom: `0`}}>Agile</li>
                  <li style={{marginBottom: `0`}}>DevOps</li>
                  <li style={{marginBottom: `0`}}>...and so on</li>
              </ul>
              <span>Come join me on this little adventure on </span> <a href="https://www.twitch.tv/developersgarage">Twitch</a> <span> every Wednesday at 12PM CST. I look forward to seeing you in the chat!</span>
              <br /><br />
              <p>If you can't make it, check it out on-demand on <a href="https://www.youtube.com/channel/UCp7TjW2p43aNzkMEBYJ8inw">YouTube</a>.</p>             
              <p>Intersted in contributing to the projects, or want to try them for yourself, here's a link to our <a href="https://github.com/devsgarage">GitHub</a> repo where all our work is stored.
              Any, and all, help is greatly appreciated!</p>
              <ul>
                  <li style={{marginBottom: `0`}}>Documetation</li>
                  <li style={{marginBottom: `0`}}>styling</li>
                  <li style={{marginBottom: `0`}}>coding</li>
                  <li style={{marginBottom: `0`}}>etc.</li>
              </ul>
              <p>It's all fair game, and if you got suggestions for how to improve the stream, or questions in general, you can contact me at any of the methods at the bottom of the page.</p>
            </div>
          </div>
        </div>
      </div>
  </Layout>
)

export default IndexPage
