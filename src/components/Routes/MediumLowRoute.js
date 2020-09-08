import React from 'react';
import { LowAcknowledgement, AnimationsCombined, HowLongHaveYouFeltLikeThis, ReasonForFeelings, ReasonForFeelingsInput, PositiveThingQuestion, FriendsLikeQuestion, AnotherExerciseQuestion } from '../SharedComponents/SharedComponents';
import { isLongerThanThreeDays, randomQuestionNumber } from '../../actions/route-functions';
import { CSSTransition } from "react-transition-group";
import { ChooseExercise } from '../Exercises/ChooseExercise';
import { SetExercises } from '../Exercises/SetExercises';
import '../../styles/animation.css';
const data = require('../../data/data.json');

class MediumLowRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAcknowledge: true,
            showHowLong: null,
            showReasonForFeeling: null,
            showRandomQuestions: null,
            knowReasonForFeeling: null,
            randQues: 0,
            randPositive: null,
            showRandomPositiveStatement: null,
            showRandomExercises: null,
            exercise: 'meditating',
            anotherExercise: null
        }
        this.showThenFade = this.showThenFade.bind(this);
      }

    // method called as soon as all elements on the page are rendered & changed showAcknowledge to false after 3 seconds. This will hide the statement.
    componentDidMount() { 
        // set timeout to say I’m sorry you are feeling like this
        setTimeout( () => { this.setState({ showAcknowledge: false }) }, 3000)
        // random function for random questions
        this.setState({ randQues: randomQuestionNumber(2) });
        // random function for random positive statements
        const positiveArray = data[4].mediumLow.positiveStatements;
        this.setState({ randPositive: randomQuestionNumber(positiveArray.length) });
        // setting exercise
        let exercise = ChooseExercise(['gratitude']);
        this.setState({ exercise: exercise });
    }

    // called onexit of showAcknowledge
    threeDayFunction() { 
        isLongerThanThreeDays(res => {
            res ? this.setState({ showHowLong: true, showAcknowledge: false }) : this.setState({ showReasonForFeeling: true, showAcknowledge: false })
        })
    }

    // Function will fade random positive statement after 3 seconds
    showThenFade() { setTimeout( () => { this.setState({ showRandomPositiveStatement: false }) }, 3000) }

    // called from button click on the how long have you been feeling this way component. This then hides the div.
    answeredHowLong() { this.setState({ showHowLong: false }) }
    
    //called onexit of HowLongHaveYouFeltLikeThis component - trigged from state changing to false in answeredHowLong()
    showReasonForFeeling() { this.setState({ showReasonForFeeling: true }) }

    // called from button click on the do you know why you feel like this div. This sets state for whether user knows why they feel the way they do & either way, will hide the div
    answeredReasonKnown(reasonKnown){ reasonKnown ? this.setState({ knowReasonForFeeling: true, showReasonForFeeling: false }) : this.setState({ knowReasonForFeeling: false, showReasonForFeeling: false }) }
    
    // called onexit from ReasonForFeelings component, trigged from answeredReasonKnown() function above. This function will either show the input box or go onto the random questions section
    afterReasonForFeeling() { this.state.knowReasonForFeeling ? this.setState({ showReasonInput: true}) : this.setState({ showRandomQuestions: true }) }
    
    // called when user pressed submit on the answered reason input, This will hide the div
    answeredReasonInput() { this.setState({ showReasonInput: false }) }

    // called onexit from ReasonForFeelingsInput component - once the user had clicked submit
    showRandQuestion() { this.setState({ showRandomQuestions: true })}

    // called on button submit when user has answered random question in randomQuestion component. Then hides the random question component.
    answeredRandomQuestion() { this.setState({ showRandomQuestions: false }) }

    //called onexit from randomQuestion component. Shows random positive statements & then called ShowThenFade function
    showRandomPositiveStatement() { 
        this.setState({ showRandomPositiveStatement: true })
        this.showThenFade()
    }
    // called onexit of random positive statement & shows random exercise
    showRandomExercise() {
        this.setState({ showRandomExercises: true })
    }

    anotherExercise() {
        this.setState({ anotherExercise: true })
    }
    
    render() {
        const randomQuestion = this.state.randQues == 0 ? <PositiveThingQuestion buttonClick={this.answeredRandomQuestion.bind(this)} /> : <FriendsLikeQuestion buttonClick={this.answeredRandomQuestion.bind(this)} />;
        return (        
            <div className='background-box'>
                <AnimationsCombined />
                <div className='info-box'>   
                    <CSSTransition in={this.state.showAcknowledge} timeout={3000} classNames="fade" unmountOnExit appear onExited={() => this.threeDayFunction()}><LowAcknowledgement /></CSSTransition>
                    <CSSTransition in={this.state.showHowLong} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showReasonForFeeling()}><HowLongHaveYouFeltLikeThis buttonClick={this.answeredHowLong.bind(this)}/></CSSTransition>
                    <CSSTransition in={this.state.showReasonForFeeling} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.afterReasonForFeeling()}><ReasonForFeelings onClick={this.answeredReasonKnown.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showReasonInput} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandQuestion()}><ReasonForFeelingsInput buttonClick={this.answeredReasonInput.bind(this)} /></CSSTransition>
                    <CSSTransition in={this.state.showRandomQuestions} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomPositiveStatement()}>{ randomQuestion }</CSSTransition>
                    <CSSTransition in={this.state.showRandomPositiveStatement} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.showRandomExercise()}><h1 className='info-box-title'>{ data[4].mediumLow.positiveStatements[this.state.randPositive]}</h1></CSSTransition>
                    <CSSTransition in={this.state.showRandomExercises} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.anotherExercise()}><div>{SetExercises(this.state.exercise)}</div></CSSTransition>
                    <CSSTransition in={this.state.anotherExercise} timeout={2000} classNames="fade" unmountOnExit><AnotherExerciseQuestion /></CSSTransition>
                </div>
            </div>
        );
    }
}

export default MediumLowRoute;