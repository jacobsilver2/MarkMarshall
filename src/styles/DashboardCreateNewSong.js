import styled from "styled-components"
import { Field } from "formik"
export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`
export const Category = styled.div`
  border-bottom: 2px solid black;
  padding: 2rem;
  margin: 1rem;
`
export const SubmitButton = styled.button`
  background-color: #ffc600;
  min-width: 250px;
  min-height: 100px;
  font-size: 2rem;
  &:hover {
    background-color: green;
  }
`

export const Title = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  margin: 1rem;
`

export const Label = styled.label`
  text-align: left;
  padding-right: 2rem;
  font-weight: bold;
`

export const AddedValues = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const AddedValue = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    margin: 0 1rem;
    border: none;
    background: none;
  }
`
export const NewEntry = styled.div`
  display: grid;
  /* justify-content: center; */
  min-height: 5rem;
  grid-template-columns: 5fr 1fr;
  margin: 1rem;
  input {
    font-size: 1.5rem;
    ::placeholder {
      font-size: 1.5rem;
    }
  }
  button {
    cursor: pointer;
    margin: 0 2rem;
    /* &:hover {
      color: blue;
    } */
  }
`

export const StyledField = styled(Field)`
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
  }
`
export const UploadWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
