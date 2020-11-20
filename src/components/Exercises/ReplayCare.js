import React from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';
const data = require('../../data/data.json');

export default class ReplyCare extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            randomCare1: '',
            randomCare2: '',
            rand1: null,
            rand2: null,
            listOfCare: [],
            oneEntry: false
        };

        this.getRandomCare = this.getRandomCare.bind(this);
    }

    componentDidMount = () => {
        this.getRandomCare();
    }

    selectRandomIndex() {
        let randomNumber = Math.floor(Math.random() * this.state.listOfCare.length);
        return randomNumber
    }


    getRandomCare = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let listOfKeys = [];

        database.ref(`users/${uid}/takeCare`)
            .on('value', (snapshot) => {
                // get list of keys for each entry
                snapshot.forEach((childSnapshot) => {
                    listOfKeys.push(childSnapshot.key);
                })
                this.setState({ listOfCare: listOfKeys })
                // pick a random entry
                let rand1 = this.selectRandomIndex();
                this.setState({ rand1: rand1 })
                let rand2 = this.selectRandomIndex();
                if (listOfKeys.length > 1) {
                    while (rand2 == this.state.rand1) {
                        rand2 = this.selectRandomIndex()
                    }
                    if (rand2 !== this.state.rand1) {
                        this.setState({ rand2: rand2 })
                    }
                }
                // don't show a second bullet point if there's only one entry
                else {
                    this.setState({ oneEntry: true })
                }
                database.ref(`users/${uid}/takeCare/${listOfKeys[rand1]}`)
                    .on('value', (childSnapshot) => {
                        let entry1 = childSnapshot.val();
                        this.setState({ randomCare1: entry1 });
                    })
                database.ref(`users/${uid}/takeCare/${listOfKeys[rand2]}`)
                    .on('value', (childSnapshot) => {
                        let entry2 = childSnapshot.val();
                        this.setState({ randomCare2: entry2 });
                    })
            })
    }

    render() {
        return (
            <div className="positive-padding">
                <h2 className='info-box-title-no-padding'>{data[3].shared.replayCare}</h2>
                <div className="gratitudeBox">
                    <h2>{this.state.randomCare1}</h2>
                    {!this.state.oneEntry && <h2>{this.state.randomCare2}</h2>}
                </div>
                <div className='button-container'>
                    <button className='next-button-dark free-form-submit extra-margin-top' onClick={this.props.buttonClick}>NEXT</button>
                </div>
            </div>
        )
    }
}