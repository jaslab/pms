import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarSo from '../components/headers/AppbarSo'
import SoContent from '../components/contents/SoContent'

function SoDashboard() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarSo />
            <div align="center" >
                <SoContent />
            </div>
            <Footer />
        </>
    )
}

export default SoDashboard
