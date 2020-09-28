const path = require("path")
const slash = require("slash")
// const slugify = require("../src/lib/slugify")

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

function createSongPages(result, createPage) {
  const songTemplate = path.join(__dirname, "../src/templates/songTemplate.js")
  const songsPages = result.data.songs.edges
  songsPages.forEach(edge => {
    const { title, contentful_id } = edge.node
    createPage({
      path: `/music/${slugify(title)}`,
      component: slash(songTemplate),
      context: {
        title,
        contentful_id,
      },
    })
  })
}

function graphqlForSongs(graphql, createPage) {
  return graphql(`
    {
      songs: allContentfulSong {
        edges {
          node {
            contentful_id
            tempo
            soundsLike
            instrumentation
            audio {
              file {
                url
              }
            }
            title
            description {
              internal {
                content
              }
            }
            composer
            createdAt
            genre
            mood
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    createSongPages(result, createPage)
  })
}

exports.graphqlForSongs = graphqlForSongs
