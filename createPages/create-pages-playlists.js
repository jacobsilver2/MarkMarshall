const path = require("path")
const slash = require("slash")

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;"
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

function createPlaylistPages(result, createPage) {
  const playlistTemplate = path.join(__dirname, "../src/templates/playlist.js")
  const playlistPages = result.data.playlists.edges
  playlistPages.forEach(edge => {
    const { title, contentful_id } = edge.node
    createPage({
      path: `/playlists/${slugify(title)}`,
      component: slash(playlistTemplate),
      context: {
        title,
        contentful_id,
      },
    })
  })
}

function graphqlForPlaylists(graphql, createPage) {
  return graphql(`
    {
      playlists: allContentfulPlaylist {
        edges {
          node {
            description {
              description
            }
            contentful_id
            title
            updatedAt
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    createPlaylistPages(result, createPage)
  })
}

exports.graphqlForPlaylists = graphqlForPlaylists
