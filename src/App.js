import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/authentication/login'
import ForgotPassword from './components/authentication/forgotPassword'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path = "/login/" Component = { Login }/>
          <Route exact path = "/forgot_password/" Component = { ForgotPassword }/>
        </Switch>
      </div>
    )
  }

}

export default App;
