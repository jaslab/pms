import React from 'react'

function frontheader() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
           
        </ul>
        <form className="form-inline ml-3">
            <div className="input-group input-group-sm">
                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                    </button>
                </div>
            </div>
        </form>
        {/* Right navbar links */}
        
    </nav>
    )
}

export default frontheader
