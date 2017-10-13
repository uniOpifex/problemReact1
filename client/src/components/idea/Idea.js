import React from 'react'
import styled from 'styled-components'

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
  const deleteIdea = () => {
    props.deleteIdea(props._id)
  }

  const handleChange = (event) => {
    props.handleChange(event, props._id)
  }
  const updateIdea = () => {
    props.updateIdea(props._id)
    console.log('UPDATING')
  }

  return (
    <IdeaStyles>
      <input onBlur={updateIdea} onChange={handleChange} name="title" value={props.title} />
      <textarea onBlur={updateIdea} onChange={handleChange} name="description" value={props.description}/>
      <button onClick={deleteIdea}>Delete Idea</button>
    </IdeaStyles>
  )
}

export default Idea
