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

// export default function rankify(entries) {
//   const aCount = new Map(
//     [...new Set(entries)].map(x => [x, entries.filter(y => y === x).length])
//   )
//   const arr = [...aCount].map(([name, value]) => ({ name, value }))
//   // return arr.filter(el => el.value >= 5)
//   return arr
// }

export function highRanking(entries) {
  const aCount = new Map(
    [...new Set(entries)].map(x => [x, entries.filter(y => y === x).length])
  )
  const arr = [...aCount].map(([name, value]) => ({ name, value }))
  return arr.filter(el => el.value >= 10).map(el => el.name)
}

export function medRanking(entries) {
  const aCount = new Map(
    [...new Set(entries)].map(x => [x, entries.filter(y => y === x).length])
  )
  const arr = [...aCount].map(([name, value]) => ({ name, value }))
  return arr.filter(el => el.value >= 5 && el.value < 10).map(el => el.name)
}

export function lowRanking(entries) {
  const aCount = new Map(
    [...new Set(entries)].map(x => [x, entries.filter(y => y === x).length])
  )
  const arr = [...aCount].map(([name, value]) => ({ name, value }))
  return arr.filter(el => el.value < 5).map(el => el.name)
}
