import React from 'react'
import styled from 'styled-components'

// You can easily nest css components in your styled-components
// This gets converted into raw css when loaded on your page
const IdeaStyles = styled.div`
  height: 300px;
  width: 300px;
  margin: 20px;
  background-color: rgba(253, 255, 0, 0.79);
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

const Idea = (props) => {
  // Creates a method that triggers another function being passed down 
  // another function
  const deleteIdea = () => {
    props.deleteIdea(props._id)
  }

  const handleChange = (event) => {
    props.handleChange(event, props._id)
  }
  const updateIdea = () => {
    props.updateIdea(props._id)
  }

  return (
    <IdeaStyles>
      {/* onBlur triggers whenever the user navigates off the input */}
      <input onBlur={updateIdea} onChange={handleChange} name="title" value={props.title} />
      <textarea onBlur={updateIdea} onChange={handleChange} name="description" value={props.description}/>
      <button onClick={deleteIdea}>Delete Idea</button>
    </IdeaStyles>
  )
}

export default Idea
