import React from "react"
import styled from "styled-components"
import Select from "react-select"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
const options = [
  { value: "nameAsc", label: "Name, a-z" },
  { value: "nameDesc", label: "Name, z-a" },
]

const Sort = ({ setSortBy }) => {
  const handleChange = e => {
    setSortBy(e.value)
  }

  return (
    <Wrapper>
      <div style={{ paddingRight: "1rem" }}>
        <h1>Sort</h1>
      </div>
      <div style={{ minWidth: "200px" }}>
        <Select onChange={handleChange} options={options} />
      </div>
    </Wrapper>
  )
}

export default Sort
