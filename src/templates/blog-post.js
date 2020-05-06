import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
export default ({ data }) => {
    return (
        <Layout>
            <h2 style={{marginBottom: `0`}}>{data.kontentItemBlog.elements.blog_title.value}</h2>
            <p style={{fontSize: `.75rem`, fontStyle: `italic`}}>{data.kontentItemBlog.elements.publish_date.value}</p>
            <div dangerouslySetInnerHTML={{ __html: data.kontentItemBlog.elements.content.resolvedData.html}} />            
        </Layout>
    )
}
export const query = 
    graphql`
    query($id: String!) {  
        kontentItemBlog(id: { eq: $id }) { 
            id
            elements {
              publish_date {
                value(formatString: "MM/DD/YYYY")
              }
              content {
                resolvedData {
                  html
                }
              }
              blog_title {
                value
              }
            }
        }
    }
    `