import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');
let listOfContent = [];

export default class ReplayContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomContent: '',
            listOfContent: [],
            arrayIndex: null
        };

        this.getRandomContent = this.getRandomContent.bind(this);
    }

    componentDidMount = () => {
        this.getRandomContent().then(this.setRandomContent);
    }

    getRandomContent() {
        return new Promise(function(resolve) {
            listOfContent = [];
            const user = firebase.auth().currentUser;
            const uid = user.uid;
            database.ref(`users/${uid}/content`).on('value', function(snap){
                for (let key in snap.val()) {
                    for (let key2 in snap.val()[key]) {
                        let contentObj = {}
                        contentObj['date'] = key;
                        contentObj['time'] = key2;
                        contentObj['reason'] = snap.val()[key][key2]['reason'];
                        listOfContent.push(contentObj);
                    }
                }
                resolve();
            });
        })
    }

    setRandomContent = () => {
        this.setState({listOfContent: listOfContent})
        let number = this.selectRandomIndex()
        this.setState({arrayIndex: number}) 
        let randomContent = this.state.listOfContent[number];
        this.setState({randomContent: randomContent})
    }

    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random()*this.state.listOfContent.length)
        return randomNumber
    }

    render() {
        return (
            <div className="positive-padding">
                <h2 className='info-box-title-no-padding'>{data[3].shared.contentReplayStatement}</h2>
                <div className="gratitudeBox">
                    { this.state.randomContent && <h3>{this.state.randomContent.date} - {this.state.randomContent.time}</h3> }
                    { this.state.randomContent && <p>{this.state.randomContent.reason}</p> }
                </div>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit extra-margin-top' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
        )
    }
}