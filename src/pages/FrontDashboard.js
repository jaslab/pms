import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarFront from '../components/headers/AppbarFront';
import FrontCont from '../components/contents/FrontCont';


function FrontDashboard() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarFront/>
            <FrontCont/>
            <Footer/>
        </>
    )
}

export default FrontDashboard
