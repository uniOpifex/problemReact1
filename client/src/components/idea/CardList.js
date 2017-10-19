import React from 'react'
import styled from 'styled-components'
import Card from './Card'

const CardsListStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`
// This is a simple stateless component that just loops through an array of props and renders another component
// Remember to pass props in as an argument when you use stateless functions.
const CardList = (props) => {
  return (
    <CardsListStyles>
       {props.cardCollection.map((card) => { 
        return (
          <Card key={card._id} _id={card._id}
            handleChange={props.handleChange}
            updateCard={props.updateCard} deleteCard={props.deleteCard}
            name={card.name} type={card.type} color={card.color} />
        )
      })}
    </CardsListStyles>
  )
}

export default CardList
