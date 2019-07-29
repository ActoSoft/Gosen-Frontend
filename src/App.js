import React, { Component, Fragment } from 'react'
import './App.scss'
import 'antd/dist/antd.css'
import Router from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component{

    render(){
        return(
            <Fragment>
                <Router />
                <ToastContainer />
            </Fragment>
        )
    }

}

export default App