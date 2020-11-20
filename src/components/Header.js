import React from 'react';
import { Link } from 'react-router-dom';
import { FirstAid, Menu, Report } from '../components/SharedComponents/MenuBarComponents';

export const Header = () => (
    <header className="header">
        <div className="content-container">
        <div className="header__content"> 
            <Report />
            <Link className="first-aid-button" to={{ pathname: '/first-aid' }}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
            </Link>
            <FirstAid />
            <Menu />
        </div>
        </div>
    </header>
)
export default Header

