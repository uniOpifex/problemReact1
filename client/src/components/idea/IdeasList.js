import React from 'react'
import styled from 'styled-components'
import Idea from './Idea'

const IdeasListStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

const IdeasList = (props) => {
  return (
    <IdeasListStyles>
      {props.ideas.map((idea) => {
        return (
          <Idea key={idea._id} _id={idea._id} 
            handleChange={props.handleChange} 
            updateIdea={props.updateIdea} deleteIdea={props.deleteIdea} 
            title={idea.title} description={idea.description} />
        )
      })}
    </IdeasListStyles>
  )
}

export default IdeasList
