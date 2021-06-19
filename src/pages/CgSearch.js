import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarCgSearch from '../components/headers/AppbarCgSearch';
import CgSearchContent from '../components/contents/CgSearchContent'


function CgSearch() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarCgSearch/>
            <div align="center" >
            <CgSearchContent/>
            </div>
            
            <Footer/>
        </>
    )
}

export default CgSearch
