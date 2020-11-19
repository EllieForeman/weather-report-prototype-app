import React from 'react';
import { Acknowledgement, AnimationsLayered, HowLongHaveYouFeltLikeThis, ReasonForFeelings, ReasonForFeelingsInput, AnotherExerciseQuestion, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { PositiveThingQuestion, HelpedCopeQuestion } from '../SharedComponents/MentalHealthQuestions'
import { isLongerThanThreeDays, randomQuestionNumber, chooseAnotherRandomExercise, DoUnavailableExercises, GetUnavailableExercises } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';

import '../../styles/animation.css';

// all exercises
import { Breathing, Meditating, Grounding } from '../Exercises/TextBasedExercises';
import Gratitude from '../Exercises/ReplayGratitude';
import PositiveMemory from '../Exercises/ReplayPosMemories';
import LikeAboutSelf from '../Exercises/ReplayLikeAboutSelf';

const routeExercises = ['breathing', 'meditating', 'grounding', 'gratitude', 'positive', 'selflike'];
let firstExercise = 'meditating';
let availableExercises;

class LowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'low',
            showAcknowledge: false,
            showHowLong: null,
            showReasonForFeeling: null,
            showRandomQuestions: null,
            knowReasonForFeeling: null,
            randQues: 0,
            showRandomExercises: null,
            exercise: 'meditating',
            availableExercises: [],
            exerciseArray: routeExercises,
            neutralAnimation: true,
            lowFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1,
            weatherFadeIn: null,
            weatherSymbol: null
        }
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
        // set timeout to say I’m sorry you are feeling like this
        setTimeout(() => { this.setState({ showAcknowledge: false }) }, 10500)
        // random function for random questions
        this.setState({ randQues: randomQuestionNumber(2) });
        // setting exercise
        GetUnavailableExercises(routeExercises).then(DoUnavailableExercises).then(function(result) {
            availableExercises = result
            
            firstExercise = ChooseExercise(availableExercises)
        })
        setTimeout(() => { this.setState({ exercise: firstExercise }) }, 2000)

        setTimeout(() => { this.setState({ neutralAnimation: false, lowFadeIn: true }) }, 500)
        setTimeout(() => {
            setInterval(() => {
                if (this.state.animationSpeed <= 1 && this.state.animationSpeed >= 0.1)
                    this.setState({ animationSpeed: this.round((this.state.animationSpeed - 0.1), 1) })
            }, 100)
        }, 5000)
        setTimeout(() => { this.setState({ whiteBackground: true }) }, 5500)
        setTimeout(() => { this.setState({ showAcknowledge: true }) }, 7500)
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    // called onexit of showAcknowledge
    threeDayFunction() {
        isLongerThanThreeDays(res => {
            res ? this.setState({ showHowLong: true, showAcknowledge: false }) : this.setState({ showReasonForFeeling: true, showAcknowledge: false })
        })
    }

    // called from button click on the how long have you been feeling this way component. This then hides the div.
    answeredHowLong() { this.setState({ showHowLong: false }) }

    //called onexit of HowLongHaveYouFeltLikeThis component - trigged from state changing to false in answeredHowLong()
    showReasonForFeeling() { this.setState({ showReasonForFeeling: true }) }

    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown) { reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }

    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true }) : this.setState({ showRandomQuestions: true }) }

    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    // called onexit from ReasonForFeelingsInput component - once the user had clicked submit
    showRandQuestion() { this.setState({ showRandomQuestions: true }) }

    // called on button submit when user has answered random question in randomQuestion component. Then hides the random question component.
    answeredRandomQuestion() { this.setState({ showRandomQuestions: false }) }

    // called onexit of random positive statement & shows random exercise
    showRandomExercise() {
        this.setState({ showRandomExercises: true })
    }
    // called on onexit after a random exercise and asks user if they want another
    askAnotherExerciseQuestion() {
        if (this.state.exerciseArray.length == 1) {
            this.setState({ showFeedbackStatement: true, showRandomExercises: false })
        } else {
            this.setState({ showAnotherExerciseQuestion: true, showRandomExercises: false })
        }
    }

    // called when user presses 'yes' or 'no' to another question
    answeredAnotherExerciseQuestion(another) { another ? (this.chooseAnotherExercise()) : this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: false }) }

    // returns a random exercise that isn't the same as the one just seen
    chooseAnotherExercise() {
        let exerciseArray = chooseAnotherRandomExercise(availableExercises, this.state.exercise);
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true, exerciseArray: exerciseArray });
        let exercise = ChooseExercise(exerciseArray);
        this.setState({ exercise: exercise });
    }
    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() { this.state.yesAnotherExercise ? this.setState({ showRandomExercises: true }) : this.setState({ showRandomExercise: false, showFeedbackStatement: true }) }
    
    SetExercises = (exercise) => {
        if (exercise == 'meditating') { return <Meditating buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'grounding') { return <Grounding buttonValue={"NEXT"} buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'breathing') { return <Breathing buttonValue={"NEXT"} buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'gratitude') { return <Gratitude buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'positive') { return <PositiveMemory buttonClick={this.askAnotherExerciseQuestion.bind(this)} /> }
        if (exercise === 'selflike') { return <LikeAboutSelf buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
    }

    render() {
        const randomQuestion = this.state.randQues == 0 ? <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <HelpedCopeQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
        const showQuestionorExercise = this.state.showRandomExercises ? <div> {this.SetExercises(this.state.exercise)}</div> : ''
        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralBackground']} />
                </CSSTransition>
                <CSSTransition in={this.state.lowFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[this.state.animationSpeed]} animations={[this.state.weatherFadeIn]} />
                </CSSTransition>
                <CSSTransition in={this.state.whiteBackground} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='background-box'></div>
                </CSSTransition>
                <div className='info-box'>
                    <CSSTransition in={this.state.showAcknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}><Acknowledgement dataFromParent={this.state.route} /></CSSTransition>
                    <CSSTransition in={this.state.showHowLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showReasonForFeeling()}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandQuestion()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showRandomQuestions} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomExercise()}>{randomQuestion}</CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit><FeedbackStatement route={this.state.route} weather={this.state.weatherSymbol}/></CSSTransition>
                </div>
                {showQuestionorExercise}
            </div>
        );
    }
}

export default LowRoute;