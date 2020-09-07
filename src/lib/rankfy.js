export default function rankify(entries) {
  let rankedObj = {}
  entries.forEach(entry => {
    if (rankedObj.hasOwnProperty(entry)) {
      rankedObj[entry] += 1
    } else {
      const entryObj = { [entry]: 1 }
      rankedObj = { ...rankedObj, ...entryObj }
    }
  })
  return rankedObj
}
