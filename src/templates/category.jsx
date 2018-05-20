import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import MainHeader from '../components/Layout/Header'
import PostListing from '../components/PostListing/PostListing'
import config from '../../data/SiteConfig'


const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
`

export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.category
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <div className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
        <main>
          <MainHeader
            siteTitle={config.siteTitle}
            siteDescription={config.siteDescription}
            location={this.props.location}
            logo={config.siteLogo}
          />
          <BodyContainer>
            <PostListing postEdges={postEdges} />
          </BodyContainer>
        </main>
      </div>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`
