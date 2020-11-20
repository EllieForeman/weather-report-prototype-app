import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/weather-symbols/grey-cloud.svg';
import swctn from '../../images/logo/swctn-logo.png';
import ss from '../../images/logo/ss_logo.png';
import sm from '../../images/logo/STME-logo.png'

export class ProjectLandingPage extends React.Component {
    state = {
        showContent: true
    }

    onNext = () => {
        this.props.history.push('/choosesymbol');
    };

    render() {
        
        return (
            <div className="backgroundProjects">
                <header className="headerHeight">
                    <div className="floatLeft vertical-center">
                        <img className="iconHeader" src={icon} alt="image of weather"></img>
                        <h2 className="titleProject">MY WEATHER REPORT</h2>
                    </div>
                    <div className="floatRight vertical-center">
                        <Link className="linkTextProjectPage" to={{ pathname: '/login' }}>LOG IN</Link>
                    </div>
                </header>
                <div className="video-container">
                    <iframe src="https://player.vimeo.com/video/468571472" width="500" height="450" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                </div>
                <div className="WR-info-text">
                    <h1>ABOUT MY WEATHER REPORT</h1>
                    <p>My weather report is a web based browser tool for monitoring your inner weather, tracking these moods over time and noticing patterns. It is a self reflection tool primarily aimed at men from 35- 55 to address the two decade high in england and wales of men taking their lives. </p>
                    <p>The project was funded by the South West Creative Technology Network to use automotive technologies and research to develop creative tools. The multidisciplinary team co-created the tool with men from the Hope Project run by Second Step.</p>
                    <p>We are looking for partnerships, people to test and feedback our prototype and funding to develop our prototype. </p>
                    <p>This project was run by <a target="_blank"  href="www.studiomeineck.com">Studio Meineck</a> as part of its range of socially inclusive and responsible design projects in collaboration with Aidan Moesby. </p>
                    <h2>If you would like to sign up for testing and feedback please email: info@studiomeineck.com</h2>
                </div>
                <div className="flex-container">
                    <div className="imageContainer">
                        <img className="logoImage" src={swctn} alt="image of weather"></img>
                    </div>
                    <div className="imageContainer">
                        <img className="logoImage" src={sm} alt="image of weather"></img>
                    </div>                    
                    <div className="imageContainer">
                        <img className="logoImage" src={ss} alt="image of weather"></img>
                    </div>
                </div>
            </div>

        ) 
    }
}

export default ProjectLandingPage;
