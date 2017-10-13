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

  async componentWillMount () {
    const { userId } = this.props.match.params
    const res = await axios.get(`/api/users/${userId}`)
    this.setState({user: res.data})
  }

  render () {
    return (
      <div>
        <IdeaTitleStyle>
          <h1>{this.state.user.userName}'s Idea Board</h1>
          <button>New Idea</button>
        </IdeaTitleStyle>
        <IdeasList ideas={this.state.user.ideas} />
      </div>
    )
  }
}

export default IdeaPage
