// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';


// What’s one small thing you can do to make yourself feel better?
export class PositiveThingQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valuePos: '' };
        this.handlePosSubmit = this.handlePosSubmit.bind(this);
    }

    handlePosSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.valuePos !== ''){
        database.ref(`users/${uid}/positiveThings`).push(this.state.valuePos);
        }
    }

    handlePosChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div className="info-box">
                <h2 className='info-box-title '> What's one small thing you can do to make yourself feel a bit better?</h2>
                <p>It could be something like going outside, having your favourite drink or throwing some rubbish away</p>
                <form onSubmit={this.handlePosSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handlePosChange} />
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// How can you positively change your situation?
export class ChangeSituation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valuePos: '' };
        this.handlePosSubmit = this.handlePosSubmit.bind(this);
    }

    handlePosSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.valuePos !== ''){
        database.ref(`users/${uid}/positiveChangeSituation`).push(this.state.valuePos);
        }
    }

    handlePosChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div className="info-box">
                <h2 className='info-box-title-top'>{data[3].shared.positiveChange}</h2>
                <form onSubmit={this.handlePosSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handlePosChange} />
                </form>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
        )
    }
}

// What’s one thing a friend would say they like about you?
export class FriendsLikeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { friendsLike: '' };
        this.handleFriendsSubmit = this.handleFriendsSubmit.bind(this);
    }

    handleFriendsSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.friendsLike !== ''){
        database.ref(`users/${uid}/friendsLike`).push(this.state.friendsLike);
        }
    }

    handleFriendsChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[4].mediumLow.questions.friendLike}</h2>
                <form onSubmit={this.handleFriendsSubmit}>
                    <input className='free-form-input' type="text" value={this.state.value} onChange={this.handleFriendsChange} />
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// What’s one small thing you can do to make yourself feel better?
export class PositiveChangeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valuePos: '' };
        this.handlepositiveChangeSubmit = this.handlepositiveChangeSubmit.bind(this);
    }

    handlepositiveChangeSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.valuePos !== ''){
        database.ref(`users/${uid}/positiveChange`).push(this.state.valuePos);
        }
    }

    handlepositiveChange = (e) => {
        this.setState({ valuePos: e.target.value });
    }

    render() {
        return (
            <div className="info-box">
                <h2 className='info-box-title'>{data[3].shared.positiveChange}</h2>
                <form onSubmit={this.handlepositiveChangeSubmit}>
                    <div className="flex-center">
                        <input className='free-form-input-vertical' type="text" value={this.state.value} onChange={this.handlepositiveChange} />
                    </div>
                    <div className="button-container">
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// What things helped you cope in the past?
export class HelpedCopeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helpedCopeOne: '',
            helpedCopeTwo: '',
            helpedCopeThree: ''
        };
        this.handleCopedSubmit = this.handleCopedSubmit.bind(this);
    }

    handleCopedSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        // only push if non empty
        if (this.state.helpedCopeOne !== '') {
            database.ref(`users/${uid}/helpedCope`).push(this.state.helpedCopeOne);
        }
        if (this.state.helpedCopeTwo !== '') {
        database.ref(`users/${uid}/helpedCope`).push(this.state.helpedCopeTwo);
        }
        if (this.state.helpedCopeThree !== '') {
        database.ref(`users/${uid}/helpedCope`).push(this.state.helpedCopeThree);
        }
    }

    handlehelpedCopeOne = (e) => {
        this.setState({ helpedCopeOne: e.target.value });
    }

    handlehelpedCopeTwo = (e) => {
        this.setState({ helpedCopeTwo: e.target.value });
    }

    handlehelpedCopeThree = (e) => {
        this.setState({ helpedCopeThree: e.target.value });
    }

    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[5].low.questions.helpedCope}</h2>
                <form className='button-container-vertical' onSubmit={this.handleCopedSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handlehelpedCopeOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handlehelpedCopeTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handlehelpedCopeThree} />
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}


// Are you keeping yourself safe?
export class SafeQuestion extends React.Component {
    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[3].shared.safeQuestion}</h2>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Have you contacted your supporters?
export class ContactSupportersQuestion extends React.Component {
    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[3].shared.support}</h2>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// What three things are you grateful for?
export class GratefulQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gratefulOne: '',
            gratefulTwo: '',
            gratefulThree: ''
        };
        this.handlegratefulQuestionSubmit = this.handlegratefulQuestionSubmit.bind(this);
    }

    handlegratefulQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.gratefulOne !== ''){
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulOne);
        }
        if (this.state.gratefulTwo !== ''){
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulTwo);
        }
        if (this.state.gratefulThree !== ''){
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulThree);
        }
    }

    handlegratefulOne = (e) => {
        this.setState({ gratefulOne: e.target.value });
    }

    handlegratefulTwo = (e) => {
        this.setState({ gratefulTwo: e.target.value });
    }

    handlegratefulThree = (e) => {
        this.setState({ gratefulThree: e.target.value });
    }

    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[3].shared.gratefulQuestion}</h2>
                <form className='button-container-vertical' onSubmit={this.handlegratefulQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handlegratefulOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handlegratefulTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handlegratefulThree} />
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// What What 3 things do you enjoy?
export class EnjoyQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enjoyOne: '',
            enjoyTwo: '',
            enjoyThree: ''
        };
        this.handleEnjoyQuestionSubmit = this.handleEnjoyQuestionSubmit.bind(this);
    }

    handleEnjoyQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.enjoyOne !== ''){
        database.ref(`users/${uid}/enjoy`).push(this.state.enjoyOne);
        }
        if(this.state.enjoyTwo !== ''){
        database.ref(`users/${uid}/enjoy`).push(this.state.enjoyTwo);
        }
        if(this.state.enjoyThree !== ''){
        database.ref(`users/${uid}/enjoy`).push(this.state.enjoyThree);
        }
    }

    handleEnjoyOne = (e) => {
        this.setState({ enjoyOne: e.target.value });
    }

    handleEnjoyTwo = (e) => {
        this.setState({ enjoyTwo: e.target.value });
    }

    handleEnjoyThree = (e) => {
        this.setState({ enjoyThree: e.target.value });
    }

    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[3].shared.enjoyQuestion}</h2>
                <form className='button-container-vertical' onSubmit={this.handleEnjoyQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handleEnjoyOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handleEnjoyTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handleEnjoyThree} />
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// What 3 things do you like about yourself?
export class LikeAboutYourselfQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeOne: '',
            likeTwo: '',
            likeThree: ''
        };
        this.handleLikeQuestionSubmit = this.handleLikeQuestionSubmit.bind(this);
    }

    handleLikeQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.likeOne !== ''){
        database.ref(`users/${uid}/likeAboutSelf`).push(this.state.likeOne);
        }
        if(this.state.likeTwo !== '') { 
        database.ref(`users/${uid}/likeAboutSelf`).push(this.state.likeTwo);
        }
        if(this.state.likeThree !== ''){
        database.ref(`users/${uid}/likeAboutSelf`).push(this.state.likeThree);
        }
    }

    handleLikeOne = (e) => {
        this.setState({ likeOne: e.target.value });
    }

    handleLikeTwo = (e) => {
        this.setState({ likeTwo: e.target.value });
    }

    handleLikeThree = (e) => {
        this.setState({ likeThree: e.target.value });
    }

    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[3].shared.likeAboutYourselfQuestion}</h2>
                <form className='button-container-vertical' onSubmit={this.handleLikeQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handleLikeOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handleLikeTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handleLikeThree} />
                    <div className="button-container">
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// Are you getting the help you need QUESTION + That's good
export class GettingHelp1 extends React.Component {
    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[8].suicidal.questions.help}</h2>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Are you getting the help you need QUESTION
export class GettingHelp2 extends React.Component {
    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[8].suicidal.questions.help2}</h2>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>Yes</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>No</button>
                </div>
            </div>
        )
    }
}


// What 3 things do you do to take care of yourself to keep you well? (eg, shower etc.)
export class TakeCareQuestion
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            takeCareOne: '',
            takeCareTwo: '',
            takeCareThree: ''
        };
        this.handleTakeCareQuestionSubmit = this.handleTakeCareQuestionSubmit.bind(this);
    }

    handleTakeCareQuestionSubmit = (e) => {
        e.preventDefault();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if(this.state.takeCareOne !== '') {
        database.ref(`users/${uid}/takeCare`).push(this.state.takeCareOne);
        }
        if(this.state.takeCareTwo !== '') {
        database.ref(`users/${uid}/takeCare`).push(this.state.takeCareTwo);
        }
        if(this.state.takeCareThree !== '') {
        database.ref(`users/${uid}/takeCare`).push(this.state.takeCareThree);
        }
    }

    handletakeCareOne = (e) => {
        this.setState({ takeCareOne: e.target.value });
    }

    handletakeCareTwo = (e) => {
        this.setState({ takeCareTwo: e.target.value });
    }

    handletakeCareThree = (e) => {
        this.setState({ takeCareThree: e.target.value });
    }

    render() {
        return (
            <div className='center-vertical padding-top-always'>
                <h2 className='info-box-title'>{data[3].shared.takeCareQuestion}</h2>
                <form className='button-container-vertical' onSubmit={this.handleTakeCareQuestionSubmit}>
                    <input className='free-form-input-vertical' placeholder="1" type="text" onChange={this.handletakeCareOne} />
                    <input className='free-form-input-vertical' placeholder="2" type="text" onChange={this.handletakeCareTwo} />
                    <input className='free-form-input-vertical' placeholder="3" type="text" onChange={this.handletakeCareThree} />
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

// Have you spoken to anyone about how you feel QUESTION
export class SpokenToQ extends React.Component {
    render() {
        return (
            <div>
                <h2 className='info-box-title'>{data[8].suicidal.questions.spoken}</h2>
                <div className='button-container'>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(true)}>YES</button>
                    <button className='transparent-button' onClick={(e) => this.props.onClick(false)}>NO</button>
                </div>
            </div>
        )
    }
}

// Add in Roots (Anchors)
export class AddAnchor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            anchors: {
                name: '',
                number: 0,
                value: ''
            }
        };
        this.anchorsSubmit = this.anchorsSubmit.bind(this);
    }

    anchorsSubmit = (e) => {
        // stops page refreshing
        e.preventDefault();
        e.target.reset();

        // this.setState({ value: '' });
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        if (this.state.anchors.name !== ''){
        database.ref(`users/${uid}/anchors`).push(this.state.anchors);
        }
    }

    anchorsChangeName = (e) => {
        let anchors = { ...this.state.anchors };
        anchors.name = e.target.value;
        this.setState({ anchors });
    }

    anchorsChangeNumber = (e) => {
        let anchors = { ...this.state.anchors };
        anchors.number = e.target.value;
        this.setState({ anchors });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.anchorsSubmit}>
                    <input className='free-form-input' type="text" placeholder="name" onChange={this.anchorsChangeName} />
                    <input className='free-form-input' type="text" placeholder="number" onChange={this.anchorsChangeNumber} />
                    <div className='button-container'>
                        <button className='transparent-button free-form-submit' onClick={this.props.buttonClick}>Add</button>
                    </div>
                </form>
            </div>
        )
    }
}
