import React from 'react'
import {appbardata} from '../../../data/data'
import {Navbar} from 'react-bootstrap'
import './appbarlogin.css'

function index() {
    return (
        <>
            <Navbar variant="dark" className='background'>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/logo.jpg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
         {appbardata.sitename}
    </Navbar.Brand>
            </Navbar>
        </>
    )
}

export default index
