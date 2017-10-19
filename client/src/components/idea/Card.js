import React from 'react'
import styled from 'styled-components'

// You can easily nest css components in your styled-components
// This gets converted into raw css when loaded on your page
const CardStyles = styled.div`
  height: 200px;
  width: 300px;
  margin: 20px;
  background-color: rgba(253, 255, 0, 0.79);
  border-radius: 5%;
  input {
    font-weight: bold;
  }
  input, textarea {
    display: block;
    font-size: 1.2rem;
    margin: 10px 0;
    border: none;
    background-color: initial;
  }
  textarea{
    width: 95%;
    height: 70%
  }
`

const Card= (props) => {
  // Creates a method that triggers another function being passed down 
  // another function
  const deleteCard = () => {
    props.deleteCard(props._id)
  }

  const handleChange = (event) => {
    props.handleChange(event, props._id)
  }
  const updateCard = () => {
    props.updateCard(props._id)
  }

  return (
    <CardStyles>
      {/* onBlur triggers whenever the user navigates off the input */}
      <input onBlur={updateCard} onChange={handleChange} name="name" value={props.name} />
      <input onBlur={updateCard} onChange={handleChange} name="type" value={props.type} />
      <input onBlur={updateCard} onChange={handleChange} name="color" value={props.color}/>

      <button onClick={deleteCard}>Delete Card</button>
    </CardStyles>
  )
}

export default Card