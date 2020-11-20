// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import React, {useState} from 'react';
import moment from 'moment';
import Animation from '../../components/Animations/Animation'
import { randomQuestionNumber  } from '../../actions/route-functions';
import database from '../../firebase/firebase';
import { CSSTransition } from 'react-transition-group';
import { storage } from "../../firebase/firebase";
import { Link } from 'react-router-dom';
let listOfAnchors = [];
import { AnchorsWithoutAddOption } from '../SharedComponents/HomeComponents';

//Is there anything you are aware of that has made you feel like this QUESTION
export class ReasonForFeelings extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.reason}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Is there anything you are aware of that has made you feel like this INPUT BOX
export class ReasonForFeelingsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
    }

    handleNoteSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let date = moment().format("DD-MM-YYYY");
        let time = moment().format("kk-mm");
        database.ref(`users/${uid}/reasonForFeeling/${date}/${time}`).update({
            reason: this.state.value,
            remind: "not-asked"
        })
    }

    handleNoteChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.reason}</h1>
                <form className='button-container-vertical' onSubmit={this.handleNoteSubmit}>
                    <textarea className='free-form-input input-paragraph' placeholder="What was it that made you feel like this?" type="text" value={this.state.value} onChange={this.handleNoteChange} />
                    <button className='next-button-dark free-form-submit center' onClick={this.props.buttonClick}>NEXT</button>
                </form>
            </div>
        )
    }
}

// I’m sorry you are feeling like this
export class Acknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3]['shared']['acknowledge'][this.props.dataFromParent]}</h1>
        )
    }
}

// I’m sorry you are feeling like this ...
export class SuicidalAcknowledgement extends React.Component {
    render() {
        return (
            <h1 className='info-box-title'>{data[3].shared.acknowledge.suicidal}</h1>
        )
    }
}

// How long have you felt like this? Today, a few days, a week, longer
export class HowLongHaveYouFeltLikeThis extends React.Component {
    onHowLong = (howLong) => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the current entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', (snapshot) => {
            name = snapshot.key;
            database.ref(`users/${uid}/entries/${name}`).update({
                howLong: howLong
            })
        })
    };
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.howLong}</h1>
                <button className='transparent-button stack-button' onClick={(e) => { this.onHowLong('today'); this.props.buttonClick(true) }}>TODAY</button>
                <button className='transparent-button stack-button' onClick={(e) => { this.onHowLong('a few'); this.props.buttonClick(true) }}>A FEW DAYS</button>
                <button className='transparent-button stack-button' onClick={(e) => { this.onHowLong('a week'); this.props.buttonClick(true) }}>A WEEK</button>
                <button className='transparent-button stack-button' onClick={(e) => { this.onHowLong('longer'); this.props.buttonClick(true) }}>LONGER</button>
            </div>
        )
    }
}


// Have you spoken to anyone about how you feel QUESTION
export class SpokenToQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.spoken}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Are you at risk of harming yourself QUESTION
export class RiskOfHarm extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.risk}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Are you at risk of harming yourself QUESTION
export class RiskOfHarmTooHigh extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.riskOthers}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Do you have a plan QUESTION
export class PlanQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.plan}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Are you planning on acting QUESTION
export class PlanningQ extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.act}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Feelings pass Statement
export class FeelingsPassStatement extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.pass}</h1>
            </div>
        )
    }
}

// 999 / samaritans statement with next button
export class Samaritans extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.samaritans}</h1>
                <a href="https://www.samaritans.org/how-we-can-help/contact-samaritan/" target="_blank"><h1 className='info-box-title'>view other ways to get in touch with them.</h1></a>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>OK</button>
                </div>
            </div>
        )
    }
}

// Crisis team statement with next button
export class Crisis extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.crisis}</h1>
                <a href="http://bristolmentalhealth.org/crisis-help/" target="_blank"><h1 className='info-box-title'>http://bristolmentalhealth.org/crisis-help/</h1></a>
                <h1 className='info-box-title'>{data[8].suicidal.questions.crisis2}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>OK</button>
                </div>
            </div>
        )
    }
}

//Do you want to do another exercise
export class AnotherExerciseQuestion extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3].shared.anotherExercise}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

//UpLOAD a PHOTO
export class ReactFirebaseFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            image: null,
            url: "nothing",
            progress: 0,
            createdAt: props.entry ? moment(props.entry.createdAt) : moment()
        };
    }

  
    handleChange = (e) => {
      if (e.target.files[0]) {
        this.setState({ image: e.target.files[0] });
      }
    };
  
    handleUpload = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let date = moment().format("DD-MM-YYYY");
        const uploadTask = storage.ref(`images/${uid}/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress: progress });
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref(`images/${uid}`)
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({ url: url });
                    database.ref(`users/${uid}/reasonForFeeling/${date}/${this.props.time}`).update({
                        photoUrl: this.state.url,
                        savedOn: this.state.createdAt.valueOf()
                    });
                    database.ref(`users/${uid}/pebbles/${date}/${this.props.time}`).update({
                        photoUrl: this.state.url,
                    });
                });
            }
        );
    };

    render() {
        const feedback = this.state.progress == 100 ? <p>Thank you for uploading this memory</p> : <p></p>;
        return (
        <div className="button-container-vertical">
        <input className="max-width-photo-button" type="file" onChange={this.handleChange} />
        <button className="next-button-dark max-width-input" onClick={this.handleUpload}>
            {this.state.progress == 0 ? <span>Upload</span> :<span>{this.state.progress + "%"}</span>}
        </button>
        { feedback }
        </div>
        );
    }
  };


// Asks if the exercise helped and takes note of what it was
export class AskIfHelped extends React.Component {

    constructor(props) {
        super(props);
    }

    addToDatabase(res) {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        let exercise = this.props.exercise;
        //get id for current entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function (snapshot) {
            name = snapshot.key;
            database.ref(`users/${uid}/entries/${name}/exercises/${exercise}`).update({
                res
            })
        })
    }

    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[6].veryLow.questions.exHelped}</h1>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => { this.props.onClick(true); this.addToDatabase('yes'); }}>YES</button>
                    <button className='transparent-button' onClick={(e) => { this.props.onClick(true); this.addToDatabase('no'); }}>NO</button>
                    <button className='transparent-button' onClick={(e) => { this.props.onClick(true); this.addToDatabase('a bit'); }}>A BIT</button>
                </div>
            </div>
        )
    }
}

//Feedback Statement
export class FeedbackStatement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randFeedbackStatement: null
        }
      }

    componentDidMount() { 
        const feedbackArray = data[3]['shared']['feedbackStatements'][this.props.route]
        this.setState({ randFeedbackStatement: randomQuestionNumber(feedbackArray.length) });
    }
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{data[3]['shared']['feedbackStatements'][this.props.route][this.state.randFeedbackStatement]}</h1>
                <div className='button-container'>
                    <Link className='next-button-dark'
                        to={{
                            pathname: '/home',
                            state: { weather: this.props.weather }
                        }}>HOME
                    </Link>
                </div>
            </div>

        )
    }
}

// called when user selects that they haven't contacted their supporters
export class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: true,
            showAnchors: false,
            nextButton: false
        }

        this.showText = this.showText.bind(this);
    }

    componentDidMount() {
        // set timeout for prompts
        setTimeout(() => { this.setState({ showText: false }) }, 3000)
    }

    showText() {
        this.setState({ showAnchors: true })
    }

    render() {
        return (
            <div>
                <CSSTransition in={this.state.showText} timeout={2000} classNames="fade" unmountOnExit appear onExited={() => this.showText()}><h1 className='info-box-title'>{data[6].veryLow.questions.support}</h1></CSSTransition>
                <CSSTransition in={this.state.showAnchors} timeout={2000} classNames="fade" unmountOnExit><AnchorsWithoutAddOption onClick={this.props.onClick} /></CSSTransition>
            </div>
        )
    }
}

// show list of roots (anchors)
export class AllRoots extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listOfAnchors: []
        }
    }

    componentDidMount() {
        this.getListOfAnchors();
    }

    getListOfAnchors = () => {
        listOfAnchors = [];
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/anchors`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let names = childSnapshot.val().name;
                    let numbers = childSnapshot.val().number;
                    listOfAnchors.push(names);
                    listOfAnchors.push(numbers);
                })
                this.setState({ listOfAnchors: listOfAnchors })
            })
    }

    render() {
        let renderedOutput = this.state.listOfAnchors.map((item, index) => <h1 key={index}>{item}</h1>)
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.reach}</h1>
                {renderedOutput}
            </div>
        )
    }
}

// show list of roots (anchors)
export class AllRootsLowWithEnergy extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listOfAnchors: []
        }
    }

    componentDidMount() {
        this.getListOfAnchors();
    }

    getListOfAnchors = () => {
        listOfAnchors = [];
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/anchors`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let names = childSnapshot.val().name;
                    let numbers = childSnapshot.val().number;
                    listOfAnchors.push(names);
                    listOfAnchors.push(numbers);
                })
                this.setState({ listOfAnchors: listOfAnchors })
            })
    }

    render() {
        let renderedOutput = this.state.listOfAnchors.map((item, index) => <h1 key={index}>{item}</h1>)
        return (
            <div>
                <h1 className='info-box-title'>{data[6].veryLow.questions.roots}</h1>
                {renderedOutput}
            </div>
        )
    }
}

// show list of roots (anchors) and with a next button
export class AllRootsWithNext extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listOfAnchors: []
        }
    }

    componentDidMount() {
        this.getListOfAnchors();
    }

    getListOfAnchors = () => {
        listOfAnchors = [];

        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/anchors`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let names = childSnapshot.val().name;
                    let numbers = childSnapshot.val().number;
                    listOfAnchors.push(names);
                    listOfAnchors.push(numbers);
                })
                this.setState({ listOfAnchors: listOfAnchors })
            })
    }

    render() {
        let renderedOutput = this.state.listOfAnchors.map((item, index) => <h1 key={index}>{item}</h1>)
        return (
            <div>
                <h1 className='info-box-title'>{data[8].suicidal.questions.reach}</h1>
                {renderedOutput}
                <div className='button-container'>
                    <button className='next-button-dark' onClick={(e) => this.props.onClick(true)}>NEXT</button>
                </div>
            </div>
        )
    }
}

// Generalised piece of text with next button
export class TextWithNext extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{this.props.text}</h1>
                <div className='button-container'>
                    <button className='next-button-dark' onClick={(e) => this.props.onClick(true)}>NEXT</button>
                </div>
            </div>
        )
    }
}

// Generalised piece of text with next button larger text
export class TextWithNextOnboarding extends React.Component {
    render() {
        return (
            <div>
                <h1 className='info-box-title'>{this.props.text}</h1>
                <div className='button-container'>
                    <button className='next-button-dark' onClick={(e) => this.props.onClick(true)}>NEXT</button>
                </div>
            </div>
        )
    }
}

// Generalised piece of text with next buttonß
export class TextWithNextSmall extends React.Component {
    render() {
        return (
            <div>
                <h3 className="arrow-text">{this.props.text}</h3>
                <div className='button-container'>
                    <button className='next-button-dark' onClick={(e) => this.props.onClick(true)}>NEXT</button>
                </div>
            </div>
        )
    }
}

// Generalised piece of text with props word on button
export class TextWithButton extends React.Component {
    render() {
        return (
            <div>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>{this.props.buttonText}</button>
                </div>
            </div>
        )
    }
}

export class AnimationsLayered extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                {this.props.animations[0] ? <div className='anim-0'><Animation speed ={this.props.speeds[0]} animation={this.props.animations[0]} /></div> : ''}
                {this.props.animations[1] ? <div className='anim-1'><Animation speed ={this.props.speeds[1]} animation={this.props.animations[1]} /></div> : ''}
                {this.props.animations[2] ? <div className='anim-2'><Animation speed ={this.props.speeds[2]} animation={this.props.animations[2]} /></div> : ''}
                {this.props.animations[3] ? <div className='anim-3'><Animation speed ={this.props.speeds[3]} animation={this.props.animations[3]} /></div> : ''}
                {this.props.animations[4] ? <div className='anim-4'><Animation speed ={this.props.speeds[4]} animation={this.props.animations[4]} /></div> : ''}
                {this.props.animations[5] ? <div className='anim-5'><Animation speed ={this.props.speeds[5]} animation={this.props.animations[5]} /></div> : ''}
            </span>
        )
    }
}
