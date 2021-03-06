
import React from 'react';
import { AnimationsLayered, ReasonForFeelings, ReasonForFeelingsInput, AnotherExerciseQuestion, FeedbackStatement } from '../SharedComponents/SharedComponents';
import { PositiveThingQuestion, PositiveChangeQuestion } from '../SharedComponents/MentalHealthQuestions';
import { chooseAnotherRandomExercise, checkExercises, DoUnavailableExercises, GetUnavailableExercises } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';

// import exercises
import { Breathing, Meditating, Grounding } from '../Exercises/TextBasedExercises';
import Gratitude from '../Exercises/ReplayGratitude';
import PositiveMemory from '../Exercises/ReplayPosMemories';

class Nothing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'nothing',
            showReasonForFeeling: false,
            knowReasonForFeeling: null,
            exercise: '',
            showrandQuesOrExercise: null,
            showAnotherExerciseQuestion: null,
            neutralAnimation: true,
            nothingFadeIn: false,
            whiteBackground: false,
            animationSpeed: 1,
            weatherSymbol: null, 
            weatherFadeIn: null
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

        // setting exercise
        let firstExercise = 'breathing';
        GetUnavailableExercises(['breathing', 'meditating', 'grounding', 'gratitude', 'positive', 'posChange', 'posThing']).then(DoUnavailableExercises).then(function(result) {
            let availableExercises = result
            firstExercise = ChooseExercise(availableExercises)
        })
        setTimeout(() => { this.setState({ exercise: firstExercise }) }, 1000)

        setTimeout(() => { this.setState({ neutralAnimation: false, nothingFadeIn: true }) }, 500)
        setTimeout(() => {
            setInterval(() => {
                if (this.state.animationSpeed <= 1 && this.state.animationSpeed >= 0.1)
                    this.setState({ animationSpeed: this.round((this.state.animationSpeed - 0.1), 1) })
            }, 100)
        }, 5000)
        setTimeout(() => { this.setState({ whiteBackground: true }) }, 5500)
        setTimeout(() => { this.setState({ showReasonForFeeling: true }) }, 7500)
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }


    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown) { reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }

    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true }) : this.setState({ showrandQuesOrExercise: true }) }

    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    // called onexit from ReasonForFeelingsInput component - once the user had clicked submit
    showrandQuesOrExercise() { this.setState({ showrandQuesOrExercise: true }) }

    // called on 'next' button click when user has seen an exercise
    seenExercise() { this.setState({ showrandQuesOrExercise: false, showAnotherExerciseQuestion: true }) }

    // called on onexit after a random exercise and asks user if they want another
    askAnotherExerciseQuestion() { this.setState({ showAnotherExerciseQuestion: true, showrandQuesOrExercise: false }) }

    // called when user presses 'yes' or 'no' to another question
    answeredAnotherExerciseQuestion(another) {
        another ? (this.chooseAnotherExercise()) : this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: false })
    }

    // returns a random exercise that isn't the same as the one just seen
    chooseAnotherExercise() {
        let exerciseArray = chooseAnotherRandomExercise(['breathing', 'meditating', 'grounding', 'gratitude', 'positive', 'posChange', 'posThing'], this.state.exercise);
        this.setState({ showAnotherExerciseQuestion: false, yesAnotherExercise: true });
        let exercise = ChooseExercise(exerciseArray);
        //let exercise = 'meditating';
        this.setState({ exercise: exercise });
    }

    // goes back to random exercises if user has previously clicked yes
    afterAskAnotherQuestion() { this.state.yesAnotherExercise ? this.setState({ showrandQuesOrExercise: true }) : this.setState({ showrandQuesOrExercise: false, showFeedbackStatement: true }) }

    SetExercises = (exercise) => {
        if (exercise == 'meditating') { return <Meditating buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'grounding') { return <Grounding buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'breathing') { return <Breathing buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'gratitude') { return <Gratitude buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise == 'positive') { return <PositiveMemory buttonClick={this.askAnotherExerciseQuestion.bind(this)} /> }
        if (exercise === 'posThing') { return <PositiveThingQuestion buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }
        if (exercise === 'posChange') { return <PositiveChangeQuestion buttonClick={this.askAnotherExerciseQuestion.bind(this)}/> }

    }

    render() {
        const showQuestionorExercise = this.state.showrandQuesOrExercise ? <div> {this.SetExercises(this.state.exercise)}</div> : ''
        return (
            <div>
                <CSSTransition in={this.state.neutralAnimation} timeout={4000} classNames="fade-enter-only" unmountOnExit>
                    <AnimationsLayered speeds={[1]} animations={['neutralBackground']} />
                </CSSTransition>
                <CSSTransition in={this.state.nothingFadeIn} timeout={4000} classNames="fade-enter-only">
                    <AnimationsLayered speeds={[this.state.animationSpeed]} animations={[this.state.weatherFadeIn]} />
                </CSSTransition>
                <CSSTransition in={this.state.whiteBackground} timeout={2000} classNames="fade" unmountOnExit>
                    <div className='background-box'></div>
                </CSSTransition>
                <div className='info-box'>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showrandQuesOrExercise()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showAnotherExerciseQuestion} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterAskAnotherQuestion()}><div><AnotherExerciseQuestion onClick={this.answeredAnotherExerciseQuestion.bind(this)} /></div></CSSTransition>
                    <CSSTransition in={this.state.showFeedbackStatement} timeout={2000} className="fade" unmountOnExit><FeedbackStatement route={this.state.route} weather={this.state.weatherSymbol}/></CSSTransition>
                </div>
                {showQuestionorExercise}
                </div>
                );
            }
        }
        
export default Nothing;