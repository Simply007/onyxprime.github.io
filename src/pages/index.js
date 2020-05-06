import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import dateformat from "../../node_modules/dateformat/lib/dateformat"

function getFormattedValue(start, end){              
  let start_date = new Date(start);
    let end_date = new Date(end);        
    let event_date = "Not the same";
    if (start_date.getTime() === end_date.getTime()){
      event_date = dateformat(start_date, "mmmm dd, yyyy")      
    }
    else {
      event_date = dateformat(start_date, "mmmm dd-" ) + dateformat(end_date, "dd, yyyy")
    }

    return event_date
}
const IndexPage = ({ data }) => (
  <Layout>
    <div className="mdc-layout-grid">
      <div className="mdc-layout-grid__inner"> 
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
            <h2 style={{color: `#159957`, fontWeight: `normal`, fontSize: `2rem`}}>Blog</h2>
            <ul style={{listStyleType: `none`, margin: `0`, padding: `0`}}>
              {data.allKontentItemBlog.edges.map(({ node }) => (
                <li>
                <Link style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} to={node.fields.slug}>
                  <h3 style={{fontFamily: `"-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"`, fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`, marginBottom: `0`, fontWeight: `normal`}} href="">{node.elements.blog_title.value}</h3>
                  <p style={{fontFamily: `"-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"`, fontSize: `.75rem`, fontStyle: `italic`}}>{node.elements.publish_date.value}</p>   
                </Link>               
                </li>
              ))}
            </ul>
          </div>
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
          <h2 style={{color: `#159957`, fontWeight: `normal`, fontSize: `2rem`}}>Speaking</h2>
          <ul style={{listStyleType: `none`, margin: `0`, padding: `0`}}>            
            {data.allKontentItemSpeakingEngagements.edges.map(({ node }) => (
              <li>
                <a style={{fontSize: `1.25rem`, color: `#0275d8`, textDecoration: `none`}} href={node.elements.link_to_event_site.value}>{node.elements.name_of_event.value}</a>
                <p style={{fontSize: `.75rem`}}><i>{node.elements.location.value}</i>, {getFormattedValue(node.elements.start_date_of_event.value, node.elements.end_date_of_event.value)} </p>
              </li>                
            ))}
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

export const query = graphql`
query MyQuery {
  allKontentItemBlog {
    edges {
      node {
        id
        elements {
          blog_title {
            value
          }
          publish_date {
            value(formatString: "MMMM DD, YYYY")
          }
        }
        fields{
          slug
        }
      }
    }
  }
  allKontentItemSpeakingEngagements {
    edges {
      node {
        id
        elements {
          location {
            value
          }
          name_of_event {
            value
          }
          start_date_of_event {
            value(formatString: "MM/DD/YYYY")
          }
          end_date_of_event {
            value(formatString: "MM/DD/YYYY")
          }
          link_to_event_site {
            value
          }
        }
      }
    }
  }
}
`
