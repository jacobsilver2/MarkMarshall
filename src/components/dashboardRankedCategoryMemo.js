import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import rankify from "../lib/rankfy"

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

const Box = styled.div`
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

const DashboardRankedMemo = ({ category, songs, add, addedCategories }) => {
  const allElements = useMemo(() => {
    console.log("calculating all Elements")
    const arr = []

    songs.forEach(song => {
      song.fields[category] &&
        song.fields[category]["en-US"].forEach(el => arr.push(el))
    })
    return arr
  }, [songs])

  const ranked = useMemo(() => {
    console.log("calculating ranked")
    return rankify(allElements)
  }, [songs])

  const highRanking = useMemo(() => {
    const highRankingArr = []
    console.log("calculating high ranking")
    for (const [key, value] of Object.entries(ranked)) {
      if (value >= 10) {
        highRankingArr.push(key)
      }
    }
    return highRankingArr
  }, [songs])

  const medRanking = useMemo(() => {
    const medRankingArr = []
    console.log("calculating medium ranking")
    for (const [key, value] of Object.entries(ranked)) {
      if (value >= 5 && value < 10) {
        medRankingArr.push(key)
      }
    }
    console.log(medRankingArr)
    return medRankingArr
  }, [songs])

  const lowRanking = useMemo(() => {
    const lowRankingArr = []
    console.log("calculating low ranking")
    for (const [key, value] of Object.entries(ranked)) {
      if (value < 5) {
        lowRankingArr.push(key)
      }
    }
    return lowRankingArr
  }, [songs])

  return (
    <Wrapper>
      <details>
        <summary>select from previous {category}</summary>
        <GridWrapper>
          {highRanking.map(g => (
            <Box
              onClick={() => add(g)}
              clr="red"
              key={g}
              disabled={addedCategories && addedCategories.includes(g)}
            >
              {g}
            </Box>
          ))}
          {medRanking.map(g => (
            <Box
              onClick={() => add(g)}
              clr="yellow"
              key={g}
              disabled={addedCategories && addedCategories.includes(g)}
            >
              {g}
            </Box>
          ))}
          {lowRanking.map(g => (
            <Box
              onClick={() => add(g)}
              key={g}
              clr="blue"
              disabled={addedCategories && addedCategories.includes(g)}
            >
              {g}
            </Box>
          ))}
        </GridWrapper>
      </details>
    </Wrapper>
  )
}

export default DashboardRankedMemo
