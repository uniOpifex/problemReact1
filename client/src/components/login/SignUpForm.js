import React, { Component } from 'react'
import axios from 'axios'

class SignUpForm extends Component {
  state = {
    newUser: {
      userName: '',
      password: ''
    },
    redirectToIdea: false,
    newUserId: ''
  }

  // handleChange is called every time a user makes an input event.
  handleChange = (event) => {
    // This is equal to the name attribute of the input field
    const attribute = event.target.name
    // Deeply clone this.state.newUser
    const updateUser = {...this.state.newUser}

    // Use bracket syntax to dynamically update the object
    // event.target.value is always equal to what the user is typing
    updateUser[attribute] = event.target.value
    this.setState({newUser: updateUser})
  }

  handleSubmit = async (event) => {
    // event.preventDefault causes the form not to reload the page
    event.preventDefault()
    // Post to our API and create a new user.
    // The second argument here is the payload that 
    // is consumed on the server side as req.body
    const res = await axios.post('/api/users', {
      'user': this.state.newUser
    })

    // After the post is complete, set the state to trigger the redirect
    // and add the newly created user's id to state so we can change the route
    this.setState({redirectToIdea: true, newUserId: res.data._id})
  }

  render () {
    // If statement which is triggered after a new user posts is successful 
    if (this.state.redirectToIdea) {
      return <Redirect to={`/idea/${this.state.newUserId}`} />
    }

    return (
      <div>
        <h1>Sign-Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input
              onChange={this.handleChange} name="userName"
              type="text" value={this.state.newUser.userName}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange}
              value={this.state.newUser.password}
              name="password" type="text" />
          </div>
          <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUpForm
