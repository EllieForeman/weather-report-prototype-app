import React from 'react';
import ReactModal from 'react-modal';
import firstAid from '../../images/first-aid-icon.svg';
import { CSSTransition } from "react-transition-group";
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import { history } from '../../routers/AppRouter';
import moment from 'moment';
import database from '../../firebase/firebase';

import rainbow from '../../images/weather-symbols-no-border/rainbow.png';
import sunshine from '../../images/weather-symbols-no-border/sunshine.png';
import bluesky from '../../images/weather-symbols-no-border/bluesky.png';
import lightClouds from '../../images/weather-symbols-no-border/light-clouds.png';
import greyCloud from '../../images/weather-symbols-no-border/grey-cloud.png';
import purpleRain from '../../images/weather-symbols-no-border/cloud-rain-threat.png';
import turquoiseRain from '../../images/weather-symbols-no-border/dark-clouds.png';
import tornado from '../../images/weather-symbols-no-border/tornado.png';
import tsunami from '../../images/weather-symbols-no-border/tsunami.png';

export class Logout extends React.Component {
    startLogout() {
        firebase.auth().signOut();
    }
    render() {
        return (
            <div className='flex-center'>
                <button className="logout-button button--link" onClick={this.startLogout.bind(this)}>
                    <h1>Logout</h1></button>
            </div>
        )
    }
};

export class FirstAid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFirstAid: false,
            buttonsDisabled: true,
            showButtonDisabledMessage: false,
            mobile: true,
            showCrisisNumber: false,
            crisisText: 'MENTAL HEALTH CRISIS TEAM'
        }
        this.toggleCrisisNumber = this.toggleCrisisNumber.bind(this);
    }

    handleOpenModalFirstAid() { this.setState({ showFirstAid: true }) }
    handleCloseModalFirstAid() { this.setState({ showFirstAid: false }) }

    componentDidMount() {
        const url = window.location.pathname
        if (url === "/home" | url === "/3-home") {
            this.setState({ buttonsDisabled: false })
        }
        this.isMobileCheck();
    }

    // checks if user is using a mobile
    isMobileCheck() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.setState({ mobile: isMobile });
    }

    clickGrounding() {
        if (this.state.buttonsDisabled) {
            this.setState({ showButtonDisabledMessage: true })
        } else {
            history.push('/grounding-exercise');
        }
    }

    clickBreathing() {
        if (this.state.buttonsDisabled) {
            this.setState({ showButtonDisabledMessage: true })
        } else {
            history.push('/breathing-exercise');
        }
    }

    toggleCrisisNumber() {
        this.setState({ showCrisisNumber: !this.state.showCrisisNumber })
        if (this.state.showCrisisNumber) {
            this.setState({ crisisText: 'MENTAL HEALTH CRISIS TEAM' })
        }
        else {
            this.setState({ crisisText: '0300-555-0334' })
        }
    }

    render() {
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        return (
            <span>
                <button
                    onClick={this.handleOpenModalFirstAid.bind(this)}
                    className='first-aid-button button--link'>
                    <img src={firstAid} alt="first-aid-symbol" />
                </button>
                <ReactModal style={customStyles} className='modalFirstAid' isOpen={this.state.showFirstAid} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='first-aid-close' type="button" onClick={this.handleCloseModalFirstAid.bind(this)}>
                            CLOSE
                        </button>
                    </div>
                    <div className="flex-center">
                        <img src={firstAid} alt="first-aid-symbol" width="100px" />
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.exercise}</h3>
                        <div className="flex-center">
                            <button onClick={this.clickGrounding.bind(this)} className={this.state.buttonsDisabled ? 'exerciseDisabled button-first-aid' : 'button-first-aid'}>GROUNDING EXERCISE</button>
                        </div>
                        <div className="flex-center">
                            <button onClick={this.clickBreathing.bind(this)} className={this.state.buttonsDisabled ? 'exerciseDisabled button-first-aid' : 'button-first-aid'}>BREATHING EXERCISE</button>
                        </div>
                        <CSSTransition in={this.state.showButtonDisabledMessage} timeout={2000} classNames="fade" appear unmountOnExit>
                            <p className="flex-center exerciseMessage">You can access these exercises from the home screen</p>
                        </CSSTransition>
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.professional}</h3>
                        <div className="flex-center">
                            <button className='button-first-aid'><a className='text-first-aid' target="_blank" href="https://www.nhs.uk/service-search/find-a-gp">YOUR GP</a></button>
                        </div>
                        <div className="flex-center">
                            {(this.state.mobile) ? <button className='button-first-aid'><a className='text-first-aid' href="tel:0300-555-0334">MENTAL HEALTH CRISIS TEAM</a></button> :
                                <button className='button-first-aid' onClick={this.toggleCrisisNumber}><a className='text-first-aid'>{this.state.crisisText}</a></button>}
                        </div>
                    </div>
                    <div>
                        <h3 className="first-aid-title">{data[7].firstAid.questions.emergency}</h3>
                        <div className="flex-center">
                            {(this.state.mobile) ? <button className='button-first-aid'><a className='text-first-aid' href="tel:999">CALL 999</a></button> :
                                <button className="button-first-aid browser-first-aid">CALL 999</button>}
                        </div>
                    </div>
                </ReactModal>
            </span>
        )
    }
}

export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showAnalysis: false
        }
    }

    handleOpenModalMenu() { this.setState({ showMenu: true }) }
    handleCloseModalMenu() { this.setState({ showMenu: false }) }

    render() {
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        return (
            <span>
                <button onClick={this.handleOpenModalMenu.bind(this)} className="button--link menu-text">MENU</button>
                <ReactModal style={customStyles} className='modalMenu' isOpen={this.state.showMenu} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleCloseModalMenu.bind(this)}>
                            CLOSE
                        </button>
                    </div>

                    <h1>WHAT IS WEATHER REPORT?</h1>
                    <p>This is a tool to help you log how you're feeling, notice patterns in your mood and lead yourself through a process of self reflection. You’re the best person to understand how you’re feeling, this is just a process to help you, help yourself.</p>
                    <p>The language around expressing how you feel can be difficult, layered and complex, so sometimes a metaphor can help. We all have some idea of what someone means when they say they feel “stormy”. Weather Report uses this metaphor of inner weather to help you express how you feel.</p>
                    <h1>HOW TO USE</h1>
                    <p>You will be asked to enter your inner weather (how you are feeling) when you open the app. You can do this up to 3 times a day.</p>
                    <p>On the home page there are also roots which represent your support network, pebbles that represent positive memories and occasionally a fish that keeps a list of things you are grateful for. You can click on the white circles over the image to access these.</p>
                    <p>The more information you input, the more you’ll get out, with more positive memories, prompts and history to reflect upon.</p>
                    <h1>FEEDBACK</h1>
                    <p>This is the first version of this tool and we’d love to hear how you’ve used it and what you think. Get in touch with <a href="mailto:info@studiomeineck.com">Studio Meineck</a> to share your thoughts.</p>
                    <p>You need to log out and back in - to update your inner weather</p>
                    <Logout />
                </ReactModal>
            </span>
        )
    }
}

export class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReport: false,
            date: null,
            weather: null,
            mainWord: null,
            secondWord: null,
            thirdWord: null
        }
        this.getWeatherData = this.getWeatherData.bind(this);
    }

    componentDidMount() {
        const date = moment().format("Do MMMM");
        this.setState({ date });
        this.getWeatherData();
    }

    handleOpenModalReport() { this.setState({ showReport: true }) }
    handleCloseModalReport() { this.setState({ showReport: false }) }

    getWeatherData() {
        const uid = firebase.auth().currentUser.uid;
        let weatherSymbol = null;
        let reportTime = null;
        database.ref(`users/${uid}/weatherReports`)
            .limitToLast(1)
            .once('value', (snapshot) => {
                // get most recent report date
                let reportDate = Object.keys(snapshot.val())[0];
                snapshot.forEach((child) => {
                    // get most recent report time
                    let length = Object.keys(child.val()).length;
                    // if 3rd report of the day
                    if(length >= 3) {
                        reportTime = Object.keys(child.val())[2];
                    }
                    // if 2nd report of the day
                    else if (length == 2) {
                        reportTime = Object.keys(child.val())[1];
                    }
                    // if 1st report of the day
                    else {
                        reportTime = Object.keys(child.val())[0];

                    }
                    })
                    database.ref(`users/${uid}/weatherReports/${reportDate}/${reportTime}`).once('value', (childSnap) => {
                        weatherSymbol = childSnap.val().weather;
                        let mainWord = childSnap.val().mainword;
                        let secondWord = childSnap.val().secondarywords[0];
                        let thirdWord = childSnap.val().secondarywords[1];
                        this.setState({ secondWord: secondWord })
                        this.setState({ thirdWord: thirdWord })
                        this.setState({ mainWord: mainWord })
                        this.setState({ weather: weatherSymbol })
                })
            })
    }

    render() {
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        return (
            <span>
                <button onClick={this.handleOpenModalReport.bind(this)} className="button--link menu-text">REPORT</button>
                <ReactModal style={customStyles} className='modalMenu' isOpen={this.state.showReport} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close-report' type="button" onClick={this.handleCloseModalReport.bind(this)}>
                            Back to Home
                        </button>
                    </div>

                    <h1>TODAY</h1>
                    <h3>{this.state.date}</h3>
                    <div className="flex-center">
                        {this.state.weather == 'bluesky' && <img src={bluesky} alt="image of blue sky"></img>}
                        {this.state.weather == 'turquoise' && <img src={turquoiseRain} alt="image of threatening rain clouds"></img>}
                        {this.state.weather == 'purple-rain' && <img src={purpleRain} alt="image of dark clouds"></img>}
                        {this.state.weather == 'grey-cloud' && <img src={greyCloud} alt="image of grey clouds"></img>}
                        {this.state.weather == 'light-clouds' && <img src={lightClouds} alt="image of light cloud"></img>}
                        {this.state.weather == 'rainbow' && <img src={rainbow} alt="image of a rainbow"></img>}
                        {this.state.weather == 'sunshine' && <img src={sunshine} alt="image of sunshine"></img>}
                        {this.state.weather == 'tornado' && <img src={tornado} alt="image of a tornado"></img>}
                        {this.state.weather == 'tsunami' && <img src={tsunami} alt="image of a tsunami"></img>}
                    </div>
                    <h1>{this.state.mainWord}</h1>
                    <h3>{this.state.secondWord}</h3>
                    <h3>{this.state.thirdWord}</h3>
                    <br />
                    <h3>We are still developing this part of the tool. It would be great to hear your ideas in the feedback</h3>
                </ReactModal>
            </span>
        )
    }
}



