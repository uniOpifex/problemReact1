import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import CardList from './CardList'

const CardTitleStyle = styled.div`
  text-align:center;
  button {
    margin: 30px auto;
    padding: 10px;
    border-width: 0;
    outline: none;
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    background-color: #215de5;
    color: #ecf0f1;
  }
`

class BuildPage extends Component {
  state={
    user: {
      userName: '',
      password: '',
      cardCollection: []
    }
  }

  // Get info about the user when it initially mounts 
  async componentWillMount () {
    const { userId } = this.props.match.params
    const res = await axios.get(`/api/users/${userId}`)
    console.log(res.data)    
    this.setState({user: res.data})
    console.log(this.state)
  }

  // Create a Post for Card
  // Create onClick that creates an empty Post
  createNewCard = async () => {
    const { userId } = this.props.match.params
    const res = await axios.post(`/api/users/${userId}/cardCollection`)
    console.log(res.data)
    this.setState({user: res.data})
  }

  // Create a Delete for Card
  // Create onClick that deletes a post
  deleteCard = async (cardId) => {
    const { userId } = this.props.match.params
    const id = cardId
    const res = await axios.delete(`/api/users/${userId}/cards/${id}`)
    this.setState({user: res.data})
  }

  // Create a Patch for Card
  // Add onChange listener for title and description
  handleChange = (event, cardId) => {
    const attribute = event.target.name
    const clonedUser = {...this.state.user}
    const card = clonedUser.cards.find(i => i._id === cardId)
    console.log(card)
    card[attribute] = event.target.value
    this.setState({user: clonedUser})
  }
  // Trigger patch when leaving an input field
  updateCard = async (cardId) => {
    const { userId } = this.props.match.params
    const id = cardId

    const clonedUser = {...this.state.user}
    const card = clonedUser.cards.find(i => i._id === cardId)

    const res = await axios.patch(`/api/users/${userId}/cards/${id}`, {
      card: card
    })
    this.setState({user: res.data})
  }

  render () {
    return (
      <div>
        <CardTitleStyle>
          <h1>{this.state.user.userName}'s Card Board</h1>
          <button onClick={this.createNewCard}>New Card</button>
        </CardTitleStyle>
        <CardList Cards={this.state.user.cardCollection}
          handleChange={this.handleChange}
          deleteCard={this.deleteCard}
          updateCard={this.updateCard}
        />
      </div>
    )
  }
}

export default BuildPage