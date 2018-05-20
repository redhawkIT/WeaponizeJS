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
    // Parse articles in content/<category:exploits>/<exploit:type>/
    category = parsedFilePath.dir.split('/')[0]
    if (category === 'exploits') {
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
    const csrfPage = path.resolve('src/templates/csrf.jsx')
    const clickjackPage = path.resolve('src/templates/clickjack.jsx')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
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

          // CREATE POST OR EXPLOIT REPORT
          switch (category) {
            case 'exploits':
              createPage({
                path: slug,
                component: exploitPage,
                context: { slug }
              })
              break
            default:
              createPage({
                path: slug,
                component: postPage,
                context: { slug }
              })
          }

          //  WEAPONIZE EXPLOITS
          switch (exploit) {
            case 'csrf':
              createPage({
                path: `/csrf${slug}`,
                component: csrfPage,
                context: { slug }
              })
              break
            case 'clickjacking':
              createPage({
                path: `/clickjacking${slug}`,
                component: clickjackPage,
                context: { slug }
              })
              break
            default:
          }

        })

        const categoryList = Array.from(categories)
        categoryList.forEach(category => {
          createPage({
            path: `/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: { category }
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
