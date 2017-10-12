import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class IdeaPage extends Component {
  state={
    user: {
      userName: '',
      password: '',
      ideas: []
    }
  }

  async componentWillMount () {
    const { userId } = this.props.match.params
    const res = await axios.get(`/api/users/${userId}`)
    this.setState({user: res.data})
  }

  render () {
    return (
      <div>
        <h1>{this.state.user.userName}'s Idea Board</h1>
        {this.state.user.ideas.map((idea) => {
          return (
            <div key={idea._id}>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default IdeaPage
