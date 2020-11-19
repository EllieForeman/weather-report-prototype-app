import React from 'react';
import moment from 'moment';
import database from '../../firebase/firebase';
import { AnimationsLayered } from '../SharedComponents/SharedComponents';
import { BackButton, GetKeyByValue } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { TextWithNextSmall } from '../SharedComponents/SharedComponents';
import Arrow from '../Animations/Arrow';
require('firebase/auth');
const firebase = require('firebase/app');
const data = require('../../data/data.json');
const fadeTime = 3000;

export default class SymbolDetailedDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherSymbol: this.props.location.state.weather,
            mainWord: this.props.location.state.mainWord,
            secondaryWords: [],
            day: moment(),
            createdAt: props.entry ? moment(props.entry.createdAt) : moment(),
            newUser: false,
            report: false
        }
    }

    componentDidMount() {
        // check if user is still onboarding - user will have 0 entries at this point if so
        const uid = firebase.auth().currentUser.uid;
        // check if a weatherReport entry exists
        database.ref(`users/${uid}/weatherReports`).once("value", snapshot => {
            if (snapshot.exists()) {
                this.setState({ newUser: false })
            }
            else {
                this.setState({ newUser: true })
            }
        })
    }

    addWords(word) {
        let joined = this.state.secondaryWords.concat(word.word);
        if (this.state.secondaryWords.length > 1) {
            this.state.secondaryWords.push(word.word)
            this.state.secondaryWords.shift()
            this.setState({ secondaryWords: this.state.secondaryWords })
        } else {
            this.setState({ secondaryWords: joined })
        }
    }

    sendData() {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let date = this.state.day.format("YYYY-MM-DD")
        let time = moment().format("kk-mm")
        // work out path to route user based on main word 
        let route = GetKeyByValue(data[10].categories,this.state.mainWord);
        database.ref(`users/${uid}/weatherReports/${date}/${time}`).update({
            weather: this.state.weatherSymbol,
            mainword: this.state.mainWord,
            secondarywords: this.state.secondaryWords,
            createdAt: this.state.createdAt.valueOf(),
            route: route
        })
        switch (route) {
            case "one":
                this.props.history.push({
                    pathname: '/1',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "two":
                this.props.history.push({
                    pathname: '/2',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "three":
                this.props.history.push({
                    pathname: '/3',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "four":
                this.props.history.push({
                    pathname: '/4',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "five":
                this.props.history.push({
                    pathname: '/5',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "six":
                this.props.history.push({
                    pathname: '/6',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "seven":
                this.props.history.push({
                    pathname: '/7',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "eight":
                this.props.history.push({
                    pathname: '/8',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            case "nine":
                this.props.history.push({
                    pathname: '/9',
                    state: { weatherSymbol: this.state.weatherSymbol }
                })
                break;
            default:
                this.props.history.push('/landing');
        }
    }

    showLastPartOnboarding() {
        this.setState({ report: true });
    }

    render() {
        let time = moment().format("HH-mm")
        return (
            <div>
                {(this.state.report) ? '' :
                    <div>
                        <AnimationsLayered speeds={[0.2]} animations={['neutralTreesNoLily']} />
                        <div className='background-box'></div>
                        <div className='center-vertical'>
                            <div className='info-box-choose info-box-words'>
                                <h3 className='info-box-text-small-padding'>{data[0].regularLogin[4]}</h3>
                                <div className='word-grid'>
                                    {data[10].secondaryWords.map((word) => (
                                        <div className='words' key={word}>
                                            <button
                                                className={this.state.secondaryWords.includes(word) ? 'active-symbol-button-border' : 'symbol-button-border'}
                                                onClick={(e) => { this.addWords({ word }) }}>
                                                {word.toUpperCase()}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="button-container">
                                    <BackButton />
                                    {(this.state.newUser) ? <button className='next-button-dark' onClick={this.showLastPartOnboarding.bind(this)}>NEXT</button> : <button className='next-button-dark' onClick={this.sendData.bind(this)}>NEXT</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div>
                    <CSSTransition in={this.state.report} timeout={fadeTime} classNames="fade" unmountOnExit appear><div className='info-box'>
                        <h2 className='report-word'>REPORT</h2>
                        <div className='arrow'><Arrow /></div>
                        <TextWithNextSmall text={data[9].onboarding.report} onClick={this.sendData.bind(this)} /></div></CSSTransition>
                </div>
            </div>
        )
    }
}