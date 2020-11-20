import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

export default class Gratitude extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomGratitude1: '',
            randomGratitude2: '',
            rand1: null,
            rand2: null,
            listOfGrateful: [],
            oneEntry: false
        };

        this.getRandomGratitude = this.getRandomGratitude.bind(this);
    }

    componentDidMount = () => {
        this.getRandomGratitude();
    }

    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random() * this.state.listOfGrateful.length);
        return randomNumber
    }


    getRandomGratitude = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];

        database.ref(`users/${uid}/grateful`)
            .once('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    listOfKeys.push(childSnapshot.key);
                })
                this.setState({ listOfGrateful: listOfKeys })
                // pick a random entry
                let rand1 = this.selectRandomIndex();
                this.setState({ rand1: rand1 })
                let rand2 = this.selectRandomIndex();
                // if there are more than two gratitude entries available
                if (listOfKeys.length > 1) {
                    while (rand2 == this.state.rand1) {
                        rand2 = this.selectRandomIndex()
                    }
                    if (rand2 !== this.state.rand1) {
                        this.setState({ rand2: rand2 })
                    }
                }
                // don't show a second bullet point if there's only one gratitude
                else {
                    this.setState({ oneEntry: true })
                }
                database.ref(`users/${uid}/grateful/${listOfKeys[rand1]}`)
                    .once('value', (childSnapshot) => {
                        let entry1 = childSnapshot.val();
                        this.setState({ randomGratitude1: entry1 });
                    })
                database.ref(`users/${uid}/grateful/${listOfKeys[rand2]}`)
                    .once('value', (childSnapshot) => {
                        let entry2 = childSnapshot.val();
                        this.setState({ randomGratitude2: entry2 });
                    })
            })
    }

    render() {
        return (
            <div className="positive-padding">
                <h2 className='info-box-title-no-padding'>{data[3].shared.gratitudeReplayStatement}</h2>
                <div className="gratitudeBox">
                    <h2>{this.state.randomGratitude1}</h2>
                    {!this.state.oneEntry && <h2>{this.state.randomGratitude2}</h2>}
                </div>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit extra-margin-top' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
        )
    }
}