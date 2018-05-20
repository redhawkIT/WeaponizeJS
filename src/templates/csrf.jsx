import React from 'react'
import Helmet from 'react-helmet'

export default class CSRFTemplate extends React.Component {
  render() {
    const postNode = this.props.data.markdownRemark
    const post = postNode.frontmatter
    return (
      <div>
        <Helmet>
          <title>{`CSRF | ${post.title}`}</title>
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
      </div>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CSRFBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
      }
    }
  }
`
