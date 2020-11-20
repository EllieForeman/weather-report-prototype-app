// FILE CONTAINING COMPONENTS WHICH ARE SHARED ACROSS PATHS
const data = require('../../data/data.json');
const firebase = require('firebase/app');
require('firebase/auth');
import React, {useState} from 'react';
import moment from 'moment';import database from '../../firebase/firebase';
import { CSSTransition } from 'react-transition-group';
import { storage } from "../../firebase/firebase";
import { Link } from 'react-router-dom';
import { ReactFirebaseFileUpload } from '../SharedComponents/SharedComponents'

// Is there anything you are aware of that has made you feel like this INPUT BOX
export class ReasonForFeelingsInputAndReminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showInput: true,
            showReminder: false,
            wantsReminding: false,
            showTakePhoto: null,
            takePhoto: null,
            value: '',
            time:  moment().format("kk-mm")
        };
    }

    // functions for photo upload
    closePhotoOption() {
        this.setState({ showTakePhoto: false})
    }

    yesTakePhoto() {
        let date = moment().format("DD-MM-YYYY");
        this.setState({ takePhoto: true})
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/reasonForFeeling/${date}/${this.state.time}`).update({
            photoReminder: "yes"
        })
    }

    // functions for reason for feeling upload
    handleNoteSubmit = (e) => {
        e.preventDefault();
        this.setState({ showInput: false});
    }

    handleNoteChange = (e) => { this.setState({ value: e.target.value }) }

    // do you want reminding show
    setReminder() { this.setState({ showReminder: true, wantsReminding: true}) }
    // take a photo
    askPhoto() { this.setState({ showTakePhoto: true})}
    // do you want reminding false
    yesSetReminder() {
        this.setState({ showReminder: false})
    }
    // send input to database
    sendInput(remind) {
        let date = moment().format("DD-MM-YYYY");
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const url = window.location.pathname;
        database.ref(`users/${uid}/reasonForFeeling/${date}/${this.state.time}`).update({
            reason: this.state.value,
            remind: remind,
        })
        if (remind) {
            database.ref(`users/${uid}/pebbles/${date}/${this.state.time}`).update({
                reason: this.state.value,
            })
        }
        if (url === "/3") {
            database.ref(`users/${uid}/content/${date}/${this.state.time}`).update({
                reason: this.state.value,
            })
        }
        this.setState({ showReminder: false})
    }

    render() {
        const time = this.state.time;
        return (
            <div>
                <CSSTransition in={this.state.showInput} timeout={2000} classNames="fade" appear unmountOnExit onExited={() => this.setReminder()}>
                    <div>
                        <h1 className='info-box-title'>{data[3].shared.reason}</h1>
                        <form className='button-container-vertical' onSubmit={this.handleNoteSubmit.bind(this)}>
                            <textarea className='free-form-input input-paragraph' placeholder="What was it that made you feel like this?" type="text" value={this.state.value} onChange={this.handleNoteChange} />
                            <button className='next-button-dark free-form-submit center' onClick={this.props.buttonClick}>NEXT</button>
                        </form>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.showReminder} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.askPhoto()}>
                    <div>
                        <h1 className='info-box-title'>{data[3].shared.reminderQuestion}</h1>
                        <div className='button-container'>
                            <button className='transparent-button' onClick={this.yesSetReminder.bind(this)}>YES</button>
                            <button className='transparent-button'
                                onClick={(e) => {
                                    this.sendInput(false);
                                    this.props.onClick(true);
                                }}>NO
                            </button>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.showTakePhoto} timeout={2000} classNames="fade" unmountOnExit onExited={() => this.yesTakePhoto()}>
                    <div>
                        <h1 className='info-box-title'>{data[3].shared.photoAsk}</h1>
                        <div className='button-container'>
                            <button className='transparent-button' onClick={this.closePhotoOption.bind(this)}>YES</button>
                            <button className='transparent-button'
                                onClick={(e) => {
                                    this.sendInput(true);
                                    this.props.onClick(true);
                                }}>NO
                            </button>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.takePhoto} timeout={2000} classNames="fade" unmountOnExit>
                    <div>
                        <ReactFirebaseFileUpload time={time} />
                        <div className='button-container'>
                            <button className='transparent-button'
                                onClick={(e) => {
                                    this.sendInput(true);
                                    this.props.onClick(true);
                                }}>NEXT
                            </button>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}