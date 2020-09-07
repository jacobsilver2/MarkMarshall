import React from "react"
import rankify from "../lib/rankfy"
import styled from "styled-components"

const Wrapper = styled.div`
  position: relative;
  /* display: flex; */
  width: 100%;
  summary {
    text-align: left;
    padding: 1rem;
    cursor: pointer;
    outline: none;
  }
  /* justify-content: center; */
`
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  /* width: 100%; */
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  justify-content: center;
`
const LargeP = styled.p`
  font-size: 1.5rem;
`
const Box = styled.button`
  cursor: ${({ isDisabled }) => (isDisabled ? "" : "pointer")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  background-color: ${({ clr }) => clr};
  &:hover {
    background-color: ${({ isDisabled }) => (isDisabled ? "" : "#ffc600")};
  }
  /* text-align: center; */
`

const DashboardRankedCategory = ({ category, songs, add, addedCategories }) => {
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
        <summary>select from previous {category}</summary>
        <GridWrapper>
          {highRanking.map(g => (
            <Box
              onClick={() => add(g)}
              key={g}
              clr={addedCategories.includes(g) ? "grey" : "red"}
              disabled={addedCategories.includes(g)}
              isDisabled={addedCategories.includes(g)}
            >
              <LargeP>{g}</LargeP>
            </Box>
          ))}
          {medRanking.map(g => (
            <Box
              onClick={() => add(g)}
              key={g}
              clr={addedCategories.includes(g) ? "grey" : "yellow"}
              disabled={addedCategories.includes(g)}
              isDisabled={addedCategories.includes(g)}
            >
              <LargeP>{g}</LargeP>
            </Box>
          ))}
          {lowRanking.map(g => (
            <Box
              onClick={() => add(g)}
              key={g}
              clr={addedCategories.includes(g) ? "grey" : "dodgerBlue"}
              disabled={addedCategories.includes(g)}
              isDisabled={addedCategories.includes(g)}
            >
              <LargeP>{g}</LargeP>
            </Box>
          ))}
        </GridWrapper>
      </details>
    </Wrapper>
  )
}

export default DashboardRankedCategory
