import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarSoSearch from '../components/headers/AppbarSoSearch';
import SoSearchContent from '../components/contents/SoSearchContent'


function SoSearch() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarSoSearch/>
            <div align="center" >
            <SoSearchContent/>
            </div>
            
            <Footer/>
        </>
    )
}

export default SoSearch
