import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarCg from '../components/headers/AppbarCg'
import Content from '../components/contents/CgContent'

function CgDashboard() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarCg/>
            <Content/>
            <Footer/>
        </>
    )
}

export default CgDashboard
