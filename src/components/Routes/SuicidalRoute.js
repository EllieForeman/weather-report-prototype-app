import React from 'react';
import { AnimationsLayered, SuicidalAcknowledgement, HowLongHaveYouFeltLikeThis, RiskOfHarm, PlanQ, PlanningQ, FeelingsPassStatement, Samaritans, AllRootsWithNext, FeedbackStatement, Crisis } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays, expressedSuicidalRecently } from '../../actions/route-functions';
import { SpokenToQ, GettingHelp1, GettingHelp2 } from '../SharedComponents/MentalHealthQuestions';
import { CSSTransition } from "react-transition-group";
import { AnchorsWithoutAddOption } from '../SharedComponents/HomeComponents';
import '../../styles/animation.css';
const data = require('../../data/data.json');

class SuicidalRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'suicidal',
            acknowledge: false,
            howLong: null,
            areYouAtRisk: null,
            harm: null,
            neutralAnimation: true,
            suicidalFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1,
            weatherSymbol: null, 
            weatherFadeIn: null
        }
        this.actionAfterHarm = this.actionAfterHarm.bind(this);
        this.actionAfterPlanning = this.actionAfterPlanning.bind(this);
    }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() {
        if (typeof this.props.location.state != 'undefined' || this.props.location.state != null) {
            let weatherFadeIn = this.props.location.state.weatherSymbol + "FadeIn"
            this.setState({ weatherFadeIn: weatherFadeIn });
            this.setState({ weatherSymbol: this.props.location.state.weatherSymbol });
        } else {
            this.setState({ weatherFadeIn: "neutralBackground" });
        }
        setTimeout(() => { this.setState({ acknowledge: false }) }, 10500)

        expressedSuicidalRecently(res => {
            res ? this.setState({ expressedRecently: true }) : this.setState({ expressedRecently: false })
        })
        this.threeDayFunction()

        setTimeout(() => { this.setState({ neutralAnimation: false, suididalFadeIn: true }) }, 500)
        setTimeout(() => {
            setInterval(() => {
                if (this.state.animationSpeed <= 1 && this.state.animationSpeed >= 0.1)
                    this.setState({ animationSpeed: this.round((this.state.animationSpeed - 0.1), 1) })
            }, 100)
        }, 5000)
        setTimeout(() => { this.setState({ whiteBackground: true }) }, 5500)
        setTimeout(() => { this.setState({ acknowledge: true }) }, 7500)
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    decideStart() {
        if (this.state.expressedRecently == true) {
            this.setState({ acknowledge: true })
        }
        else if (this.state.expressedRecently == false && this.state.longerThanThreeDays == true) {
            this.setState({ acknowledge: true })
        }
        else if (this.state.longerThanThreeDays == false) {
            this.setState({ howLong: true })
        };
    }

    // called onexit of showAcknowledge
    threeDayFunction() {
        isLongerThanThreeDays(result => {
            result ? this.setState({ longerThanThreeDays: false }) : (this.setState({ longerThanThreeDays: true }))
        })
    }

    answeredHowLong() {
        this.setState({ howLong: false })
    }

    areYouAtRisk() {
        this.setState({ areYouAtRisk: true })
    }

    triggerTimeout(itemToFadeOut) {
        const fadeTime = 3000;
        setTimeout(() => { this.setState({ [itemToFadeOut]: false }) }, fadeTime)
    }

    actionAfterHarm = (res) => {
        res ? this.setState({ harm: true, areYouAtRisk: false }) : this.setState({ harm: false, areYouAtRisk: false })
    }

    triggerAfterHarm() {

        if (this.state.harm) {
            this.setState({ showPlanQ: true })
        }
        else {
            this.setState({ haveSpokenQ: true })
        }
    }

    actionAfterPlan = (res) => {
        res ? this.setState({ planning: true, showPlanQ: false }) : this.setState({ planning: false, showPlanQ: false })
    }

    triggerAfterPlan() {

        if (this.state.planning) {
            this.setState({ showPlanningQ: true })
        }
        else {
            this.setState({ showAnchors: true })
        }
    }

    actionAfterPlanning = (res) => {
        res ? this.setState({ feelingsPass: true, showPlanningQ: false }) : this.setState({ feelingsPass: false, showPlanningQ: false })
    }

    triggerAfterPlanning() {

        if (this.state.feelingsPass) {
            this.setState({ showFeelingsPass: true })
        }
        else {
            this.setState({ showCrisisTeam: true })
        }
    }

    showCrisisTeam() {
        this.setState({ showSamaritans: true })
    }

    actionAfterSamaritans() {
        this.setState({ showSamaritans: false })
    }

    showAnchors() {
        this.setState({ showAnchors: true })
    }

    leaveAnchors() {
        this.setState({ showAnchors: false })
    }

    leaveGettingHelp1(res) {
        res ? this.setState({ showGettingHelp1: false, feedback: true }) : this.setState({ showGettingHelp1: false, crisis: true })
    }

    leaveGettingHelp2(res) {
        res ? this.setState({ showGettingHelp2: false, feedback: true }) : this.setState({ showGettingHelp2: false, crisis: true })
    }

    actionAfterHelp1() {
        if (this.state.feedback) {
            this.setState({ showFeedback: true })
        }
        else if (this.state.crisis) {
            this.setState({ showCrisisTeam: true })
        }
    }

    actionAfterHelp2() {
        if (this.state.feedback) {
            this.setState({ showFeedback: true })
        }
        else if (this.state.crisis) {
            this.setState({ showCrisisTeam: true })
        }
    }

    leaveCrisis() {
        this.setState({ showCrisisTeam: false })
    }

    showSamaritans() {
        this.setState({ showSamaritans: true })
    }

    processSpokenToQ(res) {
        res ? this.setState({ haveSpokenQ: false, spoken: true }) : this.setState({ haveSpokenQ: false, help: true })
    }

    actionAfterSpokenTo() {
        if (this.state.spoken) {
            this.setState({ showGettingHelp1: true })
        }
        else if (this.state.help) {
            this.setState({ showAnchors: true })
        }
    }

    showAfterCrisis() {
        this.setState({ afterCrisisTeam: true })
    }

    triggerTimeout(itemToFadeOut) {
        const fadeTime = 3000;
        setTimeout(() => { this.setState({ [itemToFadeOut]: false }) }, fadeTime)
    }

    show(item) {
        this.setState({ [item]: true })
    }

    hide(item) {
        this.setState({ [item]: false })
    }

    render() {
        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralBackground']} />
                </CSSTransition>
                <CSSTransition in={this.state.suicidalFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[this.state.animationSpeed]} animations={[this.state.weatherFadeIn]} />
                </CSSTransition>
                <CSSTransition in={this.state.whiteBackground} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='background-box'></div>
                </CSSTransition>
                <div className='info-box'>
                    <CSSTransition in={this.state.howLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.show('acknowledge') }}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.acknowledge} timeout={2000} onEnter={() => { this.triggerTimeout('acknowledge') }} unmountOnExit classNames="fade" onExited={() => this.areYouAtRisk()}><SuicidalAcknowledgement /></CSSTransition>
                    <CSSTransition in={this.state.areYouAtRisk} timeout={2000} onExited={() => { this.triggerAfterHarm() }} classNames="fade" unmountOnExit><RiskOfHarm onClick={this.actionAfterHarm.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showPlanQ} timeout={2000} onExited={() => { this.triggerAfterPlan() }} classNames="fade" unmountOnExit><PlanQ onClick={this.actionAfterPlan.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showPlanningQ} timeout={2000} onExited={() => { this.triggerAfterPlanning() }} classNames="fade" unmountOnExit><PlanningQ onClick={this.actionAfterPlanning.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showFeelingsPass} timeout={2000} onEnter={() => { this.triggerTimeout('showFeelingsPass') }} onExited={() => { this.showCrisisTeam() }} classNames="fade" unmountOnExit><FeelingsPassStatement /></CSSTransition>
                    <CSSTransition in={this.state.showSamaritans} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showAnchors() }}><Samaritans onClick={this.actionAfterSamaritans.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.afterCrisisTeam} timeout={2000} classNames="fade" unmountOnExit onEnter={() => { this.triggerTimeout('afterCrisisTeam') }} onExited={() => { this.showSamaritans() }}><h1>{data[8].suicidal.questions.afterCrisis}</h1></CSSTransition>
                    <CSSTransition in={this.state.showCrisisTeam} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.showAfterCrisis() }}><Crisis onClick={this.leaveCrisis.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showAnchors} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.show('showGettingHelp2') }}><AnchorsWithoutAddOption onClick={this.leaveAnchors.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showGettingHelp1} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterHelp1() }}><GettingHelp1 onClick={this.leaveGettingHelp1.bind(this)} /></CSSTransition>

                    <CSSTransition in={this.state.showGettingHelp2} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterHelp2() }}><GettingHelp2 onClick={this.leaveGettingHelp2.bind(this)} /></CSSTransition>

                    <CSSTransition in={this.state.haveSpokenQ} timeout={2000} classNames="fade" unmountOnExit onExited={() => { this.actionAfterSpokenTo() }}><SpokenToQ onClick={this.processSpokenToQ.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showFeedback} timeout={2000} classNames="fade" unmountOnExit><FeedbackStatement route={this.state.route} weather={this.state.weatherSymbol}/></CSSTransition>

                </div>
            </div>
        );
    }
}



export default SuicidalRoute;