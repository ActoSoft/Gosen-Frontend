import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/authentication/login'
import ForgotPassword from './components/authentication/forgotPassword'
import './App.scss'

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
          <Route exact path = "/login/" component = { Login }/>
          <Route exact path = "/recuperar-contraseña/" component = { ForgotPassword }/>
        </Switch>
      </div>
    )
  }

}

export default App;
