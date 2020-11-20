import React from 'react';
const data = require('../../data/data.json');
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
let listOfGrateful = [];
let listOfAnchors = [];
import ReactModal from 'react-modal';
let listOfPebbles = [];
import { TextWithButton } from '../SharedComponents/SharedComponents'
import { Button, Modal } from 'react-bootstrap';
import { AddAnchor, PositiveThingQuestion } from '../SharedComponents/MentalHealthQuestions'

// What are you grateful for?
export class OneGratefulQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gratefulOne: ''
        };
        this.handlegratefulQuestionSubmit = this.handlegratefulQuestionSubmit.bind(this);
    }

    handlegratefulQuestionSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        database.ref(`users/${uid}/grateful`).push(this.state.gratefulOne);
    }

    handlegratefulOne = (e) => {
        this.setState({ gratefulOne: e.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handlegratefulQuestionSubmit}>
                    <input className='free-form-input' placeholder="add here..." type="text" onChange={this.handlegratefulOne} />
                    <div className='button-container'>
                        <button className='transparent-button free-form-submit' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </form>
            </div>
        )
    }
}

export class FishModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            listOfGrateful: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    componentDidMount() {
        this.getListOfGratitudes();
    }

    getListOfGratitudes = () => {
        listOfGrateful = [];
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        database.ref(`users/${uid}/grateful`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    let gratitude = childSnapshot.val();
                    listOfGrateful.push(gratitude);
                })
                this.setState({ listOfGrateful: listOfGrateful })
            })
    }

    toggleAddGratitude(res) {
        res ? (this.setState({ toggleAddGratitude: true, addButtonClicked: true }), listOfGrateful = []) : this.setState({ toggleAddGratitude: false })
    }

    render() {
        let renderedOutput = this.state.listOfGrateful.map((item, index) => <li className="grateful-text" key={index}>{item}</li>)
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        return (
            <div>
                {(this.props.fishAppears === true) ?
                    <Button className='clickableFish' variant="primary" onClick={this.handleShow.bind(this)}></Button>
                    : ''}
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="modal-info-box">
                        <div className="flex-center">
                            <button className='menu-close' type="button" onClick={this.handleClose.bind(this)}>
                                CLOSE
                            </button>
                        </div>
                        <h1>{data[10].home.fish}</h1>
                        <ul>
                            {renderedOutput}
                        </ul>
                        {this.state.addButtonClicked ?
                            <h3>{data[10].home.addToFish}</h3> :
                            <TextWithButton buttonText='Add another' text={data[10].home.addToFish} onClick={this.toggleAddGratitude.bind(this)} />
                        }
                        {this.state.toggleAddGratitude ? [listOfGrateful = [], <OneGratefulQuestion />] : ''}
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export class AnchorsModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            listOfAnchors: [],
            addButtonClicked: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }
    handleShow = () => {
        this.setState({
            show: true,
        })
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
                    let anchorObj = {}
                    anchorObj['name'] = childSnapshot.val().name;
                    anchorObj['number'] = childSnapshot.val().number;
                    listOfAnchors.push(anchorObj);
                })
                this.setState({ listOfAnchors: listOfAnchors })
            })
    }

    toggleAddAnchor(res) {
        res ? (this.setState({ toggleAddAnchor: true, addButtonClicked: true }), listOfAnchors = []) : this.setState({ toggleAddAnchor: false })
    }

    render() {
        const renderedOutput = this.state.listOfAnchors.map((d) => <p key={d.name}>{d.name} : {d.number}</p>);
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        return (
            <div>
                <Button className='clickablePlant' variant="primary" onClick={this.handleShow.bind(this)}></Button>
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleClose.bind(this)}>
                            CLOSE
                        </button>
                    </div>
                    <h1>{data[10].home.anchors}</h1>
                    {renderedOutput}
                    {this.state.addButtonClicked ?
                        <h2>Add another anchor here:</h2>
                        :
                        <TextWithButton buttonText='ADD ANCHOR' text={data[10].home.addToAnchors} onClick={this.toggleAddAnchor.bind(this)} />}
                    {this.state.toggleAddAnchor ? [listOfAnchors = [], <AddAnchor />] : ''}
                </ReactModal>
            </div>
        );
    }
}

export class AnchorsWithoutAddOption extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: true,
            listOfAnchors: [],
            addButtonClicked: false
        }
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
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
                    let anchorObj = {}
                    anchorObj['name'] = childSnapshot.val().name;
                    anchorObj['number'] = childSnapshot.val().number;
                    listOfAnchors.push(anchorObj);
                })
                this.setState({ listOfAnchors: listOfAnchors })
            })
    }

    render() {
        const renderedOutput = this.state.listOfAnchors.map((d) => <p key={d.name}>{d.name} : {d.number}</p>);
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        return (
            <div>
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="flex-center">
                    </div>
                    <h1>{data[8].suicidal.questions.reach}</h1>
                    {renderedOutput}
                    <div className='button-container'>
                        <button className='next-button-dark' type="button" onClick={this.props.onClick}>
                            NEXT
                </button>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export class PebblesModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            listOfPebbles: [],
            pebbleToShow: null,
            addButtonClicked: false,
            arrayIndex: null
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    componentDidMount() {
        this.getListOfPebbles().then(this.setRandomPebble);
    }

    getListOfPebbles() {
        return new Promise(function (resolve) {
            listOfPebbles = [];
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            database.ref(`users/${uid}/pebbles`).on('value', function (snap) {
                for (let key in snap.val()) {
                    for (let key2 in snap.val()[key]) {
                        let pebbleObj = {}
                        pebbleObj['date'] = key;
                        pebbleObj['time'] = key2;
                        pebbleObj['reason'] = snap.val()[key][key2]['reason'];
                        if (snap.val()[key][key2]['photoUrl'] != undefined) {
                            pebbleObj['url'] = snap.val()[key][key2]['photoUrl'];
                        }
                        listOfPebbles.push(pebbleObj);
                    }
                }
                resolve();
            });
        })
    }

    setRandomPebble = () => {
        this.setState({ listOfPebbles: listOfPebbles })
        let number = this.selectRandomIndex()
        this.setState({ arrayIndex: number })
        let randomPebble = this.state.listOfPebbles[number];
        this.setState({ pebbleToShow: randomPebble })
    }

    selectAnotherMemory() {
        let number = this.selectRandomIndex()
        while (number == this.state.arrayIndex) {
            number = this.selectRandomIndex()
        }
        if (number !== this.state.arrayIndex) {
            this.setState({ arrayIndex: number })
            let randomPebble = this.state.listOfPebbles[number];
            this.setState({ pebbleToShow: randomPebble })
        }
    }

    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random() * this.state.listOfPebbles.length)
        return randomNumber
    }

    toggleAddPebble(res) {
        res ? (this.setState({ toggleAddPebble: true, addButtonClicked: true }), listOfPebbles = []) : this.setState({ toggleAddPebble: false })
    }

    render() {
        const customStyles = {
            overlay: { zIndex: 1000 }
        };
        const photoMemory = this.state.pebbleToShow && this.state.pebbleToShow.url ?
            <img src={this.state.pebbleToShow.url} alt="photo of your recorded memory" width="100%" />
            : '';
        return (
            <div>
                <Button className='clickablePebble' variant="primary" onClick={this.handleShow.bind(this)}></Button>
                <a className='clickablePebbleArea' onClick={this.handleShow.bind(this)}></a>
                <ReactModal style={customStyles} className='modalPebbles' isOpen={this.state.show} ariaHideApp={false}>
                    <div className="flex-center">
                        <button className='menu-close' type="button" onClick={this.handleClose.bind(this)}>
                            CLOSE
                        </button>
                    </div>
                    <h1>Pebble Memories</h1>
                    {this.state.listOfPebbles.length == 0 ?
                        <h2>Use the app more to save positive memories</h2>
                        :
                        <span>
                            {this.state.pebbleToShow && <h3>{this.state.pebbleToShow.date} - {this.state.pebbleToShow.time}</h3>}
                            {this.state.pebbleToShow && <h3>{this.state.pebbleToShow.reason}</h3>}
                            {photoMemory}
                            <div className="flex-center">
                                {/* only show look at another memory button when there are more than 1 pebbles saved */}
                                {(this.state.listOfPebbles.length > 1) && <button className="transparent-button" onClick={this.selectAnotherMemory.bind(this)}>Look at another memory</button>}
                            </div>
                        </span>
                    }
                </ReactModal>
            </div>
        );
    }
}
