import React, { useContext } from "react"
import Tippy from "@tippyjs/react"
import { GlobalStateContext } from "../../context/provider"
import "tippy.js/dist/tippy.css"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LI = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  text-align: center;
  margin-bottom: 2rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
  input {
    cursor: pointer;
  }
`

const CatWrapper = styled.div`
  /* display: inline; */
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 2rem;
  color: white;
  min-height: 15vh;
  max-height: 25vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  scrollbar-width: thin;
  overflow-x: hidden;
  p {
    /* text-align: center; */
    display: inline;
  }
  ul {
    list-style-type: none;
  }
`

const FilterCategory = ({ title, categoryValues, handleCheck, icon }) => {
  const state = useContext(GlobalStateContext)
  return (
    <>
      <Tippy
        placement="auto-end"
        popperOptions={{ strategy: "fixed" }}
        interactive
        content={
          <CatWrapper>
            <ul>
              {categoryValues.map(value => (
                <li>
                  <label htmlFor={value} />
                  <input
                    key={value}
                    onClick={handleCheck}
                    type="checkbox"
                    name={value}
                    value={value}
                    defaultChecked={state.filters.includes(value)}
                  />
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </CatWrapper>
        }
      >
        <LI>
          <FontAwesomeIcon icon={icon} />
          <p style={{ display: "inline" }}>{title}</p>
        </LI>
      </Tippy>
    </>
  )
}

export default FilterCategory
