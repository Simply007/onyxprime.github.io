const path = require(`path`)
exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `kontent_item_blog`) {        
        let name = node.elements.blog_title.value.replace(/ /g, '-').toLowerCase();
        name = name.replace(':', '');
        createNodeField({
            node,
            name: `slug`,
            value: `/blog/${name}`
        })
      }
  }

  exports.createPages = async ({graphql, actions}) => {
      const { createPage } = actions
      const result = await graphql(`
        query {
            allKontentItemBlog {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                }
              }
            }
          }
      `)
      result.data.allKontentItemBlog.edges.forEach(({ node }) => {
          createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/templates/blog-post.js`),
              context: {
                  id: node.id,
              },
          })
      })
    }