import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarSo from '../components/headers/AppbarSo'
import SoDetailContent from '../components/contents/SoDetailContent'

function SoPostalDetails() {
    return (
        <>
            <AppbarSo />
            <div align="center" >
                <SoDetailContent />
            </div>
            <Footer />
        </>
    )
}

export default SoPostalDetails
