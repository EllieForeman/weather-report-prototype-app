import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
const data = require('../../data/data.json');
import { Link } from 'react-router-dom';
import sunshine from '../../images/weather-symbols/sunshine.svg';
import bluesky from '../../images/weather-symbols/bluesky.svg';
import purpleRain from '../../images/weather-symbols/cloud-rain-threat.svg';
import turquoiseRain from '../../images/weather-symbols/dark-clouds.svg';
import greysky from '../../images/weather-symbols/grey-cloud.svg';
import rainbow from '../../images/weather-symbols/rainbow.svg';
import lightclouds from '../../images/weather-symbols/light-clouds.svg';
import tornado from '../../images/weather-symbols/tornado.svg';
import tsunami from '../../images/weather-symbols/tsunami.svg';

export class ChooseSymbolPage extends React.Component {
    render() {
        return (
            <div>
                <AnimationsLayered speeds={[0.2]} animations={['neutralTreesNoLily']} />
                <div className='background-box'></div>
                <div className='center-vertical'>
                    <div className='info-box-choose'>
                        <h3 className='info-box-text'>{ data[0].regularLogin[2] }</h3>
                        <div className="flex-center"> 
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "rainbow" }
                                }}><img className='symbol' src={rainbow}/>
                            </Link>
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "sunshine" }
                                }}><img className='symbol' src={sunshine}/>
                            </Link>
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "bluesky" }
                                }}><img className='symbol' src={bluesky}/>
                            </Link>
                        </div>
                        <div className="flex-center">
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "light-clouds" }
                                }}><img className='symbol' src={lightclouds}/>
                            </Link>
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "grey-cloud" }
                                }}><img className='symbol' src={greysky}/>
                            </Link>
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "turquoise-rain" }
                                }}><img className='symbol' src={turquoiseRain}/>
                            </Link> 
                        </div>
                        <div className="flex-center">
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "purple-rain" }
                                }}><img className='symbol' src={purpleRain}/>
                            </Link>
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "tornado" }
                                }}><img className='symbol' src={tornado}/>
                            </Link>
                            <Link className='symbol-button'
                                to={{
                                    pathname: '/symbol-description',
                                    state: { weather: "tsunami" }
                                }}><img className='symbol' src={tsunami}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseSymbolPage;
