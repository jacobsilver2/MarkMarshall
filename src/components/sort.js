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
  { value: "createdAtAsc", label: "Date Added, most recent" },
  { value: "createdAtDesc", label: "Date Added, least recent" },
]

const Sort = ({ sortBy, setSortBy }) => {
  const handleChange = e => {
    setSortBy(e.value)
  }

  const plcholder = options.filter(option => option.value === sortBy)[0].label

  return (
    <Wrapper>
      <div style={{ paddingRight: "1rem" }}>
        <h1>Sort</h1>
      </div>
      <div style={{ minWidth: "300px" }}>
        <Select
          placeholder={plcholder}
          onChange={handleChange}
          options={options}
        />
      </div>
    </Wrapper>
  )
}

export default Sort
