import styled from "styled-components"
import { motion } from "framer-motion"

export const FeatWrapper = styled.div`
  border-right: 1px dashed black;
  border-bottom: 1px dashed black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FeatItemsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem;
`

export const FeaturedTitleText = styled.h1`
  font-weight: bold;
  text-align: center;
`

export const FeatItemWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed black;
  cursor: pointer;
  box-shadow: 5px 5px 4px #888888;
  &:hover {
    background-color: #ffc600;
    opacity: 80%;
  }
`
