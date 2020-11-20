import React from 'react';
import { CSSTransition } from "react-transition-group";
import { TextWithNext, AnimationsLayered, TextWithNextOnboarding } from '../SharedComponents/SharedComponents'
import { AddAnchor } from '../../components/SharedComponents/MentalHealthQuestions'
import '../../styles/animation.css';
const data = require('../../data/data.json');
const fadeTime = 3000;
const fadeTimeLonger = 5000;

export class Onboarding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            intro: true,
            newUser: true
        }
    }

    componentDidMount() {
        setTimeout(() => { this.endIntro() }, fadeTime);
    }

    // called when next button clicked after intro
    endIntro() {
        this.setState({ intro: false })
    }

    // called when next button clicked after best person text
    endBestPerson() {
        this.setState({ bestPerson: false })
    }

    // called when next button clicked after care text
    endCareText() {
        this.setState({ careText: false })
    }

    // called when next button clicked after plant explanation
    endPlant() {
        this.setState({ plant: false })
    }

    // called when next button clicked after seed explanation
    endSeed() {
        this.setState({ seed: false })
    }

    // called when next button clicked after roots adding
    endRoot() {
        this.setState({ root: false })
    }

    triggerTimeout(itemToFadeOut) {
        setTimeout(() => { this.setState({ [itemToFadeOut]: false }) }, fadeTime)
    }

    show(item) {
        this.setState({ [item]: true })
    }

    hide(item) {
        this.setState({ [item]: false })
    }

    // navigates away to start the choose weather symbol path
    goToChooseWeather() {
        this.props.history.push('/landing');
    }

    render() {
        return (
            <div>
                <CSSTransition in={this.state.intro} timeout={fadeTime} classNames="fade" unmountOnExit appear onExited={() => { this.show('bestPerson') }}><div className='info-box'><h1>{data[9].onboarding.intro}</h1></div></CSSTransition>
                <CSSTransition in={this.state.bestPerson} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.show('careText') }}><div className='info-box'><TextWithNextOnboarding text={data[9].onboarding.bestPerson} onClick={this.endBestPerson.bind(this)} /></div></CSSTransition>
                <CSSTransition in={this.state.careText} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.show('river') }}><div className='info-box'><TextWithNextOnboarding text={data[9].onboarding.care} onClick={this.endCareText.bind(this)} /></div></CSSTransition>
                <CSSTransition in={this.state.river} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('river') }} onExited={() => { this.show('environment') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['riverLevel']} /><div className='info-box-high'><h1 className="info-box-title">{data[9].onboarding.river}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.environment} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('environment') }} onExited={() => { this.show('plant') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['environment']} /><div className='background-box'></div><div className='info-box'><h1 className="info-box-title">{data[9].onboarding.environment}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.plant} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('plant') }} onExited={() => { this.show('seed') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['lilypad']} /><div className='info-box-high'><h1 className="info-box-title">{data[9].onboarding.plant}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.seed} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.show('root') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['roots']} /><div className='info-box'><TextWithNextOnboarding text={data[9].onboarding.roots} onClick={this.endSeed.bind(this)} /></div></div></CSSTransition>
                <CSSTransition in={this.state.root} timeout={fadeTime} classNames="fade" unmountOnExit onExited={() => { this.show('dropped') }}><div className='background-box-no-fade'><div className='info-box'><h1 className="info-box-title">{data[9].onboarding.addRoots}</h1><AddAnchor buttonClick={this.endRoot.bind(this)} /></div></div></CSSTransition>
                <CSSTransition in={this.state.dropped} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('dropped') }} onExited={() => { this.show('dropped2') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['riverLevel']} /><div className='info-box-high'><h1 className="info-box-title">{data[9].onboarding.putLily}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.dropped2} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('dropped2') }} onExited={() => { this.show('language1') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1, 1, 1]} animations={['riverLevel', 'lilypad', 'roots']} /></div></CSSTransition>
                <CSSTransition in={this.state.language1} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('language1') }} onExited={() => { this.show('language2') }}><div className='background-box-no-fade'><div className='info-box'><h1 className="info-box-title">{data[9].onboarding.language1}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.language2} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('language2') }} onExited={() => { this.show('language3') }}><div className='background-box-no-fade'><div className='info-box'><h1 className="info-box-title">{data[9].onboarding.language2}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.language3} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('language3') }} onExited={() => { this.show('addWeather1') }}><div className='background-box-no-fade'><div className='info-box'><h1 className="info-box-title">{data[9].onboarding.language3}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.addWeather1} timeout={fadeTime} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('addWeather1') }} onExited={() => { this.show('addWeather2') }}><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['HappyBackground']} /><div className='info-box'><h1 className="info-box-title">{data[9].onboarding.addWeather1}</h1></div></div></CSSTransition>
                <CSSTransition in={this.state.addWeather2} timeout={fadeTime} classNames="fade" unmountOnExit><div className='background-box-no-fade'><AnimationsLayered speeds={[1]} animations={['HappyBackground']} /><div className='info-box'><TextWithNextOnboarding text={data[9].onboarding.addWeather2} onClick={this.goToChooseWeather.bind(this)}/></div></div></CSSTransition>
            </div>
        );
    }
}

export default Onboarding;
