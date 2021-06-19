import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer/AppFooter'
import AppbarAoSearch from '../components/headers/AppbarAoSearch';
import AoSearchContent from '../components/contents/AoSearchContent';
import { PostalProvider } from '../context/PostalContext'


function AoSearch() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <AppbarAoSearch />
            <div align="center" >
                <PostalProvider>
                    <AoSearchContent />
                </PostalProvider>
            </div>

            <Footer />
        </>
    )
}

export default AoSearch
