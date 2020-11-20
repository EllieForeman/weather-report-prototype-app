import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

const exclusionArray = [
    '/intro',
    '/landing',
    '/symbol-more-detail',
    '/onboarding',
    '/choosesymbol',
    '/symbol-description',
    '/symbol-more-detail',
    '/breathing-exercise',
    '/grounding-exercise',
    '/project'
]

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
            {exclusionArray.indexOf(location.pathname) < 0 && <Header/>}
            <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/"/>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);