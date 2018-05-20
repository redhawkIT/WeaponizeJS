const path = require('path')
const _ = require('lodash')
const webpackLodashPlugin = require('lodash-webpack-plugin')

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  let category = 'post'
  let exploit = ''
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    category = parsedFilePath.dir.split('/')[0]
    if (category === 'exploit') {
      exploit = parsedFilePath.dir.split('/')[1].replace('-', '')
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'category', value: category })
    createNodeField({ node, name: 'exploit', value: exploit })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.jsx')
    const exploitPage = path.resolve('src/templates/exploit.jsx')
    const categoryPage = path.resolve('src/templates/category.jsx')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                    type
                    category
                    tags
                  }
                  fields {
                    slug
                    category
                    exploit
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        //  Track all the different unique categories we find
        const categories = new Set()

        result.data.allMarkdownRemark.edges.forEach(edge => {
          const { slug, category, exploit } = edge.node.fields
          categories.add(edge.node.fields.category)
          console.log(edge.node.fields)

          if (category === 'exploits') {
            // TODO: Advanced logic for weaponizing CSRF and
            createPage({
              path: edge.node.fields.slug,
              component: exploitPage,
              context: {
                slug: edge.node.fields.slug
              }
            })
          } else {
            createPage({
              path: edge.node.fields.slug,
              component: postPage,
              context: {
                slug: edge.node.fields.slug
              }
            })
          }
        })

        const categoryList = Array.from(categories)
        categoryList.forEach(category => {
          createPage({
            path: `/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          })
        })
      })
    )
  })
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    config.plugin('Lodash', webpackLodashPlugin, null)
  }
}
