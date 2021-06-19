import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarFrontSearch from '../components/headers/AppbarFrontSearch';
import Content from '../components/contents/FrontSearchContent'


function FrontSearch() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarFrontSearch/>
            <div align="center" >
            <Content/>
            </div>
            
            <Footer/>
        </>
    )
}

export default FrontSearch
