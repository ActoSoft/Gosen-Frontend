import React from 'react'
import { withAuth } from '../Authentication/'
import { Route, Redirect } from 'react-router-dom'
import Navbar from '../components/common/navbar'
import Footer from '../components/common/footer'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return(
        <Route {...rest} render={ (propsRoute) =>
            auth.isAuthenticated()
                ?
                <div>
                    <div className="navbar-container">
                        <Navbar {...propsRoute} />
                    </div>
                    <Component { ...propsRoute } { ...rest } />
                    <footer className="footer-container">
                        <Footer />
                    </footer>
                </div>
                : <Redirect to="/login" />
        } />
    )
}

export default withAuth(PrivateRoute)