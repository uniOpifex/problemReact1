import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import IdeasList from './IdeasList'

const IdeaTitleStyle = styled.div`
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

class IdeaPage extends Component {
  state={
    user: {
      userName: '',
      password: '',
      ideas: []
    }
  }

  // Get info about the user when it initially mounts 
  async componentWillMount () {
    const { userId } = this.props.match.params
    const res = await axios.get(`/api/users/${userId}`)
    this.setState({user: res.data})
  }

  // Create a Post for Idea
  // Create onClick that creates an empty Post
  createNewIdea = async () => {
    const { userId } = this.props.match.params
    const res = await axios.post(`/api/users/${userId}/ideas`)
    console.log(res.data)
    this.setState({user: res.data})
  }

  // Create a Delete for Idea
  // Create onClick that deletes a post
  deleteIdea = async (ideaId) => {
    const { userId } = this.props.match.params
    const id = ideaId
    const res = await axios.delete(`/api/users/${userId}/ideas/${id}`)
    this.setState({user: res.data})
  }

  // Create a Patch for idea
  // Add onChange listener for title and description
  handleChange = (event, ideaId) => {
    const attribute = event.target.name
    const clonedUser = {...this.state.user}
    const idea = clonedUser.ideas.find(i => i._id === ideaId)
    console.log(idea)
    idea[attribute] = event.target.value
    this.setState({user: clonedUser})
  }
  // Trigger patch when leaving an input field
  updateIdea = async (ideaId) => {
    const { userId } = this.props.match.params
    const id = ideaId

    const clonedUser = {...this.state.user}
    const idea = clonedUser.ideas.find(i => i._id === ideaId)

    const res = await axios.patch(`/api/users/${userId}/ideas/${id}`, {
      idea: idea
    })
    this.setState({user: res.data})
  }

  render () {
    return (
      <div>
        <IdeaTitleStyle>
          <h1>{this.state.user.userName}'s Idea Board</h1>
          <button onClick={this.createNewIdea}>New Idea</button>
        </IdeaTitleStyle>
        <IdeasList ideas={this.state.user.ideas}
          handleChange={this.handleChange}
          deleteIdea={this.deleteIdea}
          updateIdea={this.updateIdea}
        />
      </div>
    )
  }
}

export default IdeaPage
