import React, { useState, useEffect } from "react"
import rankify, {
  highRanking as highRankingFunc,
  medRanking as medRankingFunc,
  lowRanking as lowRankingFunc,
} from "../lib/rankfy"
import styled from "styled-components"
import { motion } from "framer-motion"
import Button from "@material-ui/core/Button"

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
const Box = styled(motion.button)`
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
  const [allElements, setAllElements] = useState([])
  const [ranked, setRanked] = useState()
  const [highRanking, setHighRanking] = useState([])
  const [medRanking, setMedRanking] = useState([])
  const [lowRanking, setLowRanking] = useState([])
  // const allElements = []
  // const highRanking = []
  // const medRanking = []
  // const lowRanking = []

  useEffect(() => {
    function createCategories() {
      setAllElements(songs.map(song => song.fields[category]["en-US"]).flat())
      // setRanked(rankify(allElements))
      setHighRanking(highRankingFunc(allElements))
      setMedRanking(medRankingFunc(allElements))
      setLowRanking(lowRankingFunc(allElements))
      // setHighRanking(allElements.reduce((el, x) => el + (x >= 5), 0))
      // setMedRanking(medRankingFunc(ranked))
      // setLowRanking(lowRankingFunc(ranked))
    }

    createCategories()
  }, [songs, addedCategories])

  // songs.forEach(song => {
  //   song.fields[category] &&
  //     song.fields[category]["en-US"].forEach(el => allElements.push(el))
  // })
  // const ranked = rankify(allElements)
  // for (const [key, value] of Object.entries(ranked)) {
  //   if (value >= 10) {
  //     highRanking.push(key)
  //   }
  //   if (value >= 5 && value < 10) {
  //     medRanking.push(key)
  //   }
  //   if (value < 5) {
  //     lowRanking.push(key)
  //   }
  // }

  return (
    <Wrapper>
      <h1>HELLO</h1>
      <details>
        <summary>select from previous {category}</summary>
        <GridWrapper>
          {highRanking.map(g => (
            <Button
              onClick={() => add(g)}
              color="primary"
              type="button"
              key={g}
              disabled={addedCategories && addedCategories.includes(g)}
            >
              {g}
            </Button>
          ))}
          {medRanking.map(g => (
            <Button
              onClick={() => add(g)}
              type="button"
              color="secondary"
              key={g}
              disabled={addedCategories && addedCategories.includes(g)}
            >
              {g}
            </Button>
          ))}
          {lowRanking.map(g => (
            <Button
              onClick={() => add(g)}
              key={g}
              type="button"
              disabled={addedCategories && addedCategories.includes(g)}
            >
              {g}
            </Button>
          ))}
        </GridWrapper>
      </details>
    </Wrapper>
  )
}

export default DashboardRankedCategory
