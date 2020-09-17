import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import rankify from "../../../lib/rankfiy"
import toTitleCase from "../../../lib/toTitleCase"
import Chip from "@material-ui/core/Chip"
import { useFormikContext } from "formik"
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
  max-height: 300px;
  overflow: scroll;
`

const Box = styled.div`
  cursor: ${({ isDisabled }) => (isDisabled ? "" : "pointer")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  background-color: ${({ clr, isDisabled }) => (isDisabled ? "grey" : clr)};
  &:hover {
    background-color: ${({ isDisabled }) => (isDisabled ? "" : "#ffc600")};
  }
  /* text-align: center; */
`

const DashboardRankedMemo = ({ category, songs, add, arrayName }) => {
  const { values } = useFormikContext()
  const allElements = useMemo(() => {
    const arr = []

    songs.forEach(song => {
      song.fields[category] &&
        song.fields[category]["en-US"].forEach(el => arr.push(el))
    })
    return arr
  }, [songs])

  const ranked = useMemo(() => {
    return rankify(allElements)
  }, [songs])

  const highRanking = useMemo(() => {
    const highRankingArr = []
    for (const [key, value] of Object.entries(ranked)) {
      if (value >= 10) {
        highRankingArr.push(key)
      }
    }
    return highRankingArr.map(el => toTitleCase(el)).sort()
  }, [songs])

  const medRanking = useMemo(() => {
    const medRankingArr = []
    for (const [key, value] of Object.entries(ranked)) {
      if (value >= 5 && value < 10) {
        medRankingArr.push(key)
      }
    }
    return medRankingArr.map(el => toTitleCase(el)).sort()
  }, [songs])

  const lowRanking = useMemo(() => {
    const lowRankingArr = []
    for (const [key, value] of Object.entries(ranked)) {
      if (value < 5) {
        lowRankingArr.push(key)
      }
    }
    return lowRankingArr.map(el => toTitleCase(el)).sort()
  }, [songs])

  return (
    <Wrapper>
      <details>
        <summary>select from previous {category}</summary>
        <GridWrapper>
          {highRanking.map((g, i) => (
            <Box
              onClick={() =>
                values[arrayName] && values[arrayName].includes(g) ? "" : add(g)
              }
              clr="red"
              key={i}
              isDisabled={values[arrayName] && values[arrayName].includes(g)}
            >
              {g}
            </Box>
            // <Chip onClick={() => add(g)} color="primary" label={g} key={i} disabled={values[]}  />
          ))}
          {medRanking.map((g, i) => (
            <Box
              onClick={() =>
                values[arrayName] && values[arrayName].includes(g) ? "" : add(g)
              }
              clr="yellow"
              key={i}
              isDisabled={values[arrayName] && values[arrayName].includes(g)}
            >
              {g}
            </Box>
          ))}
          {lowRanking.map((g, i) => (
            <Box
              onClick={() =>
                values[arrayName] && values[arrayName].includes(g) ? "" : add(g)
              }
              key={i}
              clr="blue"
              isDisabled={values[arrayName] && values[arrayName].includes(g)}
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
