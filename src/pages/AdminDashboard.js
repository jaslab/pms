import React from 'react'
import { getId, getRoles, getToken, getUsername } from '../utils/Common';
import Footer from '../components/Footer'
import Header from '../components/headers/frontheader'
import Menu from '../components/menus/AdminMenu'
import Content from '../components/contents/AdminContent'

function AdminDashboard() {

    const id = getId();
    const token = getToken();
    const roles = getRoles();
    const username = getUsername();

    return (
        <>
            <Header/>
            <Menu/>
            <Content/>
            <Footer/>
        </>
    )
}

export default AdminDashboard
