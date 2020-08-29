const {
  graphqlForPlaylists,
} = require("./createPages/create-pages-playlists.js")
const ChildProcess = require("child_process")

async function createIndiviualPages(actions, graphql) {
  const { createPage } = actions
  const promises = [graphqlForPlaylists(graphql, createPage)]
  const results = await Promise.all(promises.map(p => p.catch(e => e)))
  const validResults = results.filter(result => !(result instanceof Error))
  return validResults
}

exports.createPages = ({ graphql, actions }) => {
  return createIndiviualPages(actions, graphql)
}

exports.onPostBuild = () => {
  ChildProcess.execSync(
    "ps aux | grep jest | grep -v grep | awk '{print $2}' | xargs kill"
  )
}
