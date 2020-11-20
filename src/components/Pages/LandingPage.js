import React from 'react';
const data = require('../../data/data.json');
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { CSSTransition } from "react-transition-group";

export class LandingPage extends React.Component {
    state = {
        showContent: true
    }

    onNext = () => {
        this.props.history.push('/choosesymbol');
    };

    render() {
        
        return (
            <div className='background-box'>
                <div className='background-box'></div>
                <AnimationsLayered speeds={[0.2]} animations={['neutralTreesNoLily']} />
                <div className='info-box-login'>
                    <CSSTransition in={this.state.showContent} timeout={2000} classNames="fade" appear unmountOnExit>
                        <div>
                            <h1 className='header-text-spacing'>{ data[0].regularLogin[1] }</h1>
                            <div className="button-container padding-top">
                                <button className='next-button-dark' onClick={this.onNext}>NEXT</button>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        ) 
    }
}

export default LandingPage;
