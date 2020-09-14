import React from "react"
import styled from "styled-components"
import { useField } from "react-final-form"

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const InputContainer = styled.input`
  min-width: 4em;
  height: 2em;
  padding: 5px 15px;
  font-size: 19px;
  background-color: #ececec;
  outline: none;
  transition: all 250ms ease-in-out;
  color: #2f3337;
  border-radius: 9px;
  border: ${props => (props.error ? `1px solid #e74c3c` : 0)};
  box-shadow: "0px 0px 5px 1px #0783EF";

  &:hover {
    box-shadow: ${props =>
      props.error ? `0px 0px 5px 0px #e74c3c` : `0px 0px 5px 0px #0783EF`};
  }

  &:focus {
    outline: 0;
    box-shadow: ${props =>
      props.error ? `0px 0px 10px 1px #e74c3c` : `0px 0px 10px 1px #0783EF`};
  }

  &::placeholder {
    color: #6f6f6f;
  }
`

const ErrorText = styled.div`
  margin-top: 5px;
  color: #e74c3c;
  font-size: 15px;
  padding: 0px 4px;
  min-height: 24px;
`

export function Input(props) {
  const {
    input,
    meta: { error, touched, submitError },
  } = useField(props.name, {
    initialValue: props.initialValue,
    validate: props.validate,
  })

  const inputProps = {
    ...props,
    error: touched && error && true,
    ...input,
  }

  return (
    <InputWrapper>
      <InputContainer {...inputProps} />
      <ErrorText>{touched && (error || submitError) ? error : ""}</ErrorText>
    </InputWrapper>
  )
}
