import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarAo from '../components/headers/AppbarAo'
import Content from '../components/contents/AoContent'
import { PostalProvider } from '../context/PostalContext'

function AoDashboard() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarAo />
            <div align="center" >
                <PostalProvider>
                    <Content />
                </PostalProvider>
            </div>
            <Footer />
        </>
    )
}

export default AoDashboard
