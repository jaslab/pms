import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarCg from '../components/headers/AppbarCg'
import CgDetailContent from '../components/contents/CgDetailContent'

function CgPostalDetails() {
    return (
        <>
            <AppbarCg />
            <div align="center" >
                <CgDetailContent />
            </div>
            <Footer />
        </>
    )
}

export default CgPostalDetails
