import React from "react"
import styled from "styled-components"

const Wrapper = styled.div``

const UL = styled.ul`
  text-align: center;
`
const LI = styled.li`
  padding: 0 1rem;
  display: inline;
  background-color: ${({ isCurrent }) => (isCurrent ? "#ffc600" : "none")};
  a {
    text-decoration: none;
    pointer-events: ${({ isInactive }) => (isInactive ? "none" : "default")};
    cursor: ${({ isInactive }) => (isInactive ? "none" : "pointer")};
    color: ${({ isInactive }) => (isInactive ? "grey" : "default")};
  }
`

export const Pagination = ({
  songsPerPage,
  totalSongs,
  paginate,
  currentPage,
}) => {
  const pageNumbers = []
  const lastPage = Math.ceil(totalSongs / songsPerPage)
  for (let i = 1; i <= Math.ceil(totalSongs / songsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Wrapper>
      <UL>
        <LI isInactive={currentPage === 1}>
          <a
            href="#"
            onClick={() =>
              currentPage > 1 ? paginate(currentPage - 1) : () => ""
            }
          >
            Prev
          </a>
        </LI>
        {pageNumbers.map(pageNumber => (
          <LI isCurrent={pageNumber === currentPage} key={pageNumber}>
            <a onClick={() => paginate(pageNumber)} href="#">
              {pageNumber}
            </a>
          </LI>
        ))}
        <LI isInactive={currentPage === lastPage}>
          <a
            onClick={() =>
              currentPage < lastPage ? paginate(currentPage + 1) : () => ""
            }
            href="#"
          >
            Next
          </a>
        </LI>
      </UL>
    </Wrapper>
  )
}

export default Pagination
