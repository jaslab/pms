import React from 'react'
import AppbarLogin from '../components/headers/AppbarLogin'
import AppFooter from '../components/Footer/AppFooter'
import Loginform from '../components/forms/Loginform'

function Login() {
    return (
        <>
            <AppbarLogin />
                <Loginform />
            <AppFooter />
        </>
    )
}

export default Login
