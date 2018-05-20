module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  exploitsDir: "exploits", // The name of the directory that contains exploits or docs.
  siteTitle: "Pentest Report", // Site title.
  siteTitleAlt: "Pentest Report for INFO 415", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "http://students.washington.edu/rykeller/INFO415/pentest", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "A GatsbyJS stater for creating Documentation or Tutorials.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  googleAnalyticsID: "UA-82450300-1 ", // GA tracking ID.
  disqusShortname: "https-ericwindmill-github-io-gatsby-advanced-starter", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "User", // Username to display in the author segment.
  userTwitter: "ericwindmill", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Portland, OR", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription: "All about me!", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/RcKeller",
      iconClassName: "fa fa-github"
    },
    {
      label: "Website",
      url: "https://rykeller.com",
      iconClassName: "fa fa-external-link"
    },
    {
      label: "Email",
      url: "mailto:rykeller@uw.edu",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2017. Ryan Keller", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCChapters: ["", "Chapter 1", "Chapter 2"] // Used to generate the Table Of Contents. Index 0 should be blank.
};
