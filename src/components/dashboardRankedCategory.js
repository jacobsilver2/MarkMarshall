import React from "react"
import rankify from "../lib/rankfy"
import styled from "styled-components"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`
const LargeP = styled.p`
  font-size: 2rem;
`
const Box = styled.div`
  border: 1px dashed black;
  background-color: ${({ clr }) => clr};
`

const DashboardRankedCategory = ({ category, songs }) => {
  const allElements = []
  const highRanking = []
  const medRanking = []
  const lowRanking = []

  songs.forEach(song => {
    song.fields[category] &&
      song.fields[category]["en-US"].forEach(el => allElements.push(el))
  })
  const ranked = rankify(allElements)
  for (const [key, value] of Object.entries(ranked)) {
    if (value >= 10) {
      highRanking.push(key)
    }
    if (value >= 5 && value < 10) {
      medRanking.push(key)
    }
    if (value < 5) {
      lowRanking.push(key)
    }
  }

  highRanking.sort()
  medRanking.sort()
  lowRanking.sort()

  return (
    <Wrapper>
      <details>
        <summary>
          <h1>{category}</h1>
        </summary>
        <GridWrapper>
          {highRanking.map(g => (
            <Box key={g} clr="red">
              <LargeP>{g}</LargeP>
            </Box>
          ))}
          {medRanking.map(g => (
            <Box key={g} clr="yellow">
              <LargeP>{g}</LargeP>
            </Box>
          ))}
          {lowRanking.map(g => (
            <Box key={g} clr="green">
              <LargeP>{g}</LargeP>
            </Box>
          ))}
        </GridWrapper>
      </details>
    </Wrapper>
  )
}

export default DashboardRankedCategory
