import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

export default class Gratitude extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomGratitude: ''
        };

        this.getRandomGratitude = this.getRandomGratitude.bind(this);
    }

    getRandomGratitude = () => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];
        let rand = 0;
        let entry = '';

        database.ref(`users/${uid}/positiveThings`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    listOfKeys.push(childSnapshot.key);
                })
                // pick a random entry
                rand = Math.floor(Math.random() * listOfKeys.length);
                const randKey = listOfKeys[rand];
                database.ref(`users/${uid}/positiveThings/${randKey}`)
                    .on('value', (childSnapshot) => {
                        console.log(childSnapshot.val());
                        entry = childSnapshot.val();
                        this.setState({ randomGratitude: entry });

                    })
            })
    }

    componentDidMount = () => {
        this.getRandomGratitude();
    }

    render() {
        return (
            <div>
                <h1>{data[3].shared.gratitudeReplayStatement}</h1>
                <h1>{this.state.randomGratitude}</h1>
                <button onClick={this.props.buttonClick}>next</button>
            </div>
        )
    }
}