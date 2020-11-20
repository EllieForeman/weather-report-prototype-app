import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');
let listOfPebbles = [];

export default class PositiveMemory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listOfPebbles: [],
            pebbleToShow: null,
            arrayIndex: null
        };
    }

    componentDidMount = () => {
        this.getListOfPebbles().then(this.setRandomPebble)
    }

    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random() * this.state.listOfPebbles.length);
        return randomNumber
    }

    getListOfPebbles() {
        return new Promise(function(resolve) {
            listOfPebbles = [];
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            database.ref(`users/${uid}/pebbles`).on('value', function(snap){
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
        this.setState({listOfPebbles: listOfPebbles})
        let number = this.selectRandomIndex()
        this.setState({arrayIndex: number}) 
        let randomPebble = this.state.listOfPebbles[number];
        this.setState({pebbleToShow: randomPebble})
    }

    render() {
        const photoMemory = this.state.pebbleToShow && this.state.pebbleToShow.url ?
        <div className="flex-center-pos-memories">
            <img src={this.state.pebbleToShow.url} alt="photo of your recorded memory" width="90%"/>
        </div>
        : '';
        return (
            <div className="positive-overlay">
                <div className="positive-padding">
                    <h2>{data[3].shared.posReplayStatement}</h2>
                    <div className="setHeight">
                        { this.state.pebbleToShow && <p>{this.state.pebbleToShow.date} - {this.state.pebbleToShow.time}</p> }
                        { this.state.pebbleToShow && <p>{this.state.pebbleToShow.reason}</p> }
                        { photoMemory }
                    </div>
                    <div className='button-container'>
                        <button className='next-button-dark free-form-submit extra-margin-bottom' onClick={this.props.buttonClick}>NEXT</button>
                    </div>
                </div>
            </div>
        )
    }
}