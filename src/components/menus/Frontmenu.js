import React from 'react'
import { loginformdata } from '../../data/data'
import {getUsername, getUser} from '../../utils/Common'
import { Link } from 'react-router-dom';

function Frontmenu() {
    const username=getUsername();
    const user=getUser();
    //user.username='Samantga';

    return (
        
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">{loginformdata.ecpms}</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{username}</a>
                    </div>
                </div>
               
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                       
                        <li className="nav-item">
                            <Link to='/front_dashboard' className="nav-link">
                                <i className="nav-icon fas fa-envelope" />
                                <p>
                                    {loginformdata.new_postal}
                                </p>
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to='/front_search' className="nav-link">
                                <i className="nav-icon fas fa-search" />
                                <p>
                                     {loginformdata.search}
                                </p>
                            </Link>
                        </li>
                        
                        
                        
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}

export default Frontmenu
