import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarAo from '../components/headers/AppbarAo'
import AoDetailContent from '../components/contents/AoDetailContent'
import { PostalProvider } from '../context/PostalContext'

function AoPostalDetails() {
    return (
        <>
            <AppbarAo />
            <div align="center" >
                <PostalProvider>
                    <AoDetailContent />
                </PostalProvider>
            </div>
            <Footer />
        </>
    )
}

export default AoPostalDetails
