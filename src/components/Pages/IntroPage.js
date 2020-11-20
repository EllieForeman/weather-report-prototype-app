import React from 'react';
const firebase = require('firebase/app');
import database from '../../firebase/firebase';
import moment from 'moment';
import { CSSTransition } from "react-transition-group";
let goTo = '';

export class IntroPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIntro: true
        }
    }

    componentDidMount = () => {
        this.choosePath()
        setTimeout(() => { this.setState({ showIntro: false }) }, 2000)
        setTimeout(() => {this.ReRoute(goTo)}, 4000)
    };

    choosePath() {
        const date = moment().format("YYYY-MM-DD");
        const uid = firebase.auth().currentUser.uid; 
        let entries = database.ref(`users/${uid}/weatherReports/${date}`);
        // THIS BIT was .on instead of .once -> it was being called again when the snapshot updated!
        // check if they have entered a report more than 3 times in a day
        entries.once('value', function (snapshot) {
            const numberOfEntries = snapshot.numChildren()
            if (numberOfEntries >= 3) {
                goTo = '3-home';
                console.log(goTo);
            }
            else {
                database.ref(`users/${uid}/weatherReports`).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        goTo = 'landing';
                        console.log(goTo);
                    }
                    else {
                        // if no weatherReports have been entered, user is taken down onboarding path
                        goTo = 'onboarding';
                        console.log(goTo);

                    }
                })
            }
        });
    
    }

    ReRoute(route) {
        switch (route) {
            case "3-home":
               this.props.history.push({
                   pathname: '/3-home'
               })
               break;
           case "landing":
               this.props.history.push({
                   pathname: '/landing'
               })
               break;
           case "onboarding":
               this.props.history.push({
                   pathname: '/onboarding'
               })
               break;
    }
}
    render() {
        return (
            <div className='container'>
                <CSSTransition in={this.state.showIntro} timeout={2000} classNames="fade" appear unmountOnExit>
                    <div className="center-vertical">
                        <h1>Weather Report</h1>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

export default IntroPage;
