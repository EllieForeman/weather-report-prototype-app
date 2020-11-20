// FILE CONTAINING FUNCTIONS WHICH ARE SHARED ACROSS PATHS
import React from 'react';
const firebase = require('firebase/app');
import database from '../firebase/firebase';
import { useHistory } from 'react-router-dom'

//is longer than 3 days function
export function isLongerThanThreeDays(cb) {
    const now = Date.now(); // get timestamp for now
    const threeDaysAgo = now - 259200000; // get timestamp for 3 days ago (259200000 milliseconds)
    const uid = firebase.auth().currentUser.uid;
    let counter = 0;
    database.ref(`users/${uid}/weatherReports`)
        //.orderByChild('createdAt') //order by createAt value
        .limitToLast(2) // return two most recent entries
        .once('value', (snapshot) => {
            // date of most recent entry
            let date1 = Object.keys(snapshot.val())[0];
            // date of second most recent entry
            // check first if it exists
            // exists if more than one value of snapshot
            let date2 = '';
            let length = Object.keys(snapshot.val()).length;
            if (length > 1) {
                date2 = Object.keys(snapshot.val())[1];
            }
            // if only one entry then more than three days true
            else {
                cb(true)
                return
            }
            snapshot.forEach((child) => {
                // checks the first entry of each day
                let time = Object.keys(child.val())[0];
                database.ref(`users/${uid}/weatherReports/${date1}/${time}/createdAt`).on('value', (snapshot) => {
                    // if first entry is older than three days ago, add 1 to counter
                    let createdAt1 = snapshot.val();
                    if ((createdAt1 !== null) && (createdAt1 < threeDaysAgo)) {
                        counter += 1;
                    }

                })
                database.ref(`users/${uid}/weatherReports/${date2}/${time}/createdAt`).on('value', (snapshot) => {
                    // if second entry is older than three days ago, add 1 to counter
                    let createdAt2 = snapshot.val();
                    if ((createdAt2 !== null) && (createdAt2 < threeDaysAgo)) {
                        counter += 1;

                    }
                })
            })
            // if either or both entries older than three days, counter will be 1 or 2 -> return true
            if (counter >= 1) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
}

//set random question

export function randomQuestionNumber(num) {
    const rand = Math.floor(Math.random() * Math.floor(num));
    return rand
}

export function chooseAnotherRandomExercise(exerciseArray, lastExercise) {
    for (let i = 0; i < exerciseArray.length; i++) {
        if (exerciseArray[i] === lastExercise) {
            exerciseArray.splice(i, 1);
        }
    }
    return exerciseArray;
}

// functions which checks if a user has inputed suicidal as mainWord x times in the last week
export function expressedSuicidalRecently(cb) {
    const uid = firebase.auth().currentUser.uid;
    let counter = 0;
    const now = Date.now(); // get timestamp for now
    const sevenDaysAgo = now - 604800000; // get timestamp for 7 days ago (604800000 milliseconds)
    database.ref(`users/${uid}/weatherReports`)
        .orderByChild('createdAt') //order by createAt value
        .limitToLast(7)
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                // first entry for each day
                let childKey = Object.keys(child.val())[0];
                let mainWord = child.val()[childKey].mainWord;
                let createdAt = child.val()[childKey].createdAt;

                let mainWord2 = ''
                let createdAt2 = ''
                let mainWord3 = ''
                let createdAt3 = ''

                // second entry if exists
                if (Object.keys(child.val())[1]) {
                    let childKey2 = Object.keys(child.val())[1];
                    mainWord2 = child.val()[childKey2].mainWord;
                    createdAt2 = child.val()[childKey2].createdAt;
                }
                // third entry if exists
                if (Object.keys(child.val())[2]) {
                    let childKey3 = Object.keys(child.val())[2];
                    mainWord3 = child.val()[childKey3].mainWord;
                    createdAt3 = child.val()[childKey3].createdAt;
                }

                // count goes up if one of the key words entered as a main word in the last 7 days
                if ((createdAt >= sevenDaysAgo) && (mainWord === 'suicidal')) {
                    counter += 1;
                }
                if ((createdAt2 >= sevenDaysAgo) && (mainWord2 === 'suicidal')) {
                    counter += 1;
                }
                if ((createdAt3 >= sevenDaysAgo) && (mainWord3 === 'suicidal')) {
                    counter += 1;
                }
            })
            // has user expressed this emotion 4 times in the last week
            // this is a bit hacky (counter >= 12 because counter goes up 3 times for each entry...)
            if (counter >= 12) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
}

// functions which checks if a user has inputed a red word (manic, invincible, over stimulated) as mainWord x times in the last week
export function expressedTooHighRecently(cb) {
    const uid = firebase.auth().currentUser.uid;
    let counter = 0;
    const now = Date.now(); // get timestamp for now
    const sevenDaysAgo = now - 604800000; // get timestamp for 7 days ago (604800000 milliseconds)
    database.ref(`users/${uid}/weatherReports`)
        .orderByChild('createdAt') //order by createAt value
        .limitToLast(7)
        .once('value', (snapshot) => {
            snapshot.forEach((child) => {
                // first entry for each day
                let childKey = Object.keys(child.val())[0];
                let mainWord = child.val()[childKey].mainWord;
                let createdAt = child.val()[childKey].createdAt;

                let mainWord2 = ''
                let createdAt2 = ''
                let mainWord3 = ''
                let createdAt3 = ''

                // second entry if exists
                if (Object.keys(child.val())[1]) {
                    let childKey2 = Object.keys(child.val())[1];
                    mainWord2 = child.val()[childKey2].mainWord;
                    createdAt2 = child.val()[childKey2].createdAt;
                }
                // third entry if exists
                if (Object.keys(child.val())[2]) {
                    let childKey3 = Object.keys(child.val())[2];
                    mainWord3 = child.val()[childKey3].mainWord;
                    createdAt3 = child.val()[childKey3].createdAt;
                }

                // count goes up if one of the key words entered as a main word in the last 7 days
                if ((createdAt >= sevenDaysAgo) && (mainWord === 'manic' || 'invincible' || 'over stimulated')) {
                    counter += 1;
                }
                if ((createdAt2 >= sevenDaysAgo) && (mainWord2 === 'manic' || 'invincible' || 'over stimulated')) {
                    counter += 1;
                }
                if ((createdAt3 >= sevenDaysAgo) && (mainWord3 === 'manic' || 'invincible' || 'over stimulated')) {
                    counter += 1;
                }
            })
            // has user expressed this emotion 4 times in the last week
            // this is a bit hacky (counter >= 12 because counter goes up 3 times for each entry...)
            if (counter >= 9) {
                cb(true)
                return
            }
            else {
                cb(false)
                return
            }
        })
}

// back button
export function BackButton({ children }) {
    let history = useHistory()
    return (
        <button className='back-button' type="button" onClick={() => history.goBack()}>
            BACK
      </button>
    )
}

export function GetKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].includes(value));
}

// returns exercises that users have input for
export function GetUnavailableExercises(array) {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    return database.ref(`users/${uid}/`).once('value').then(function(snapshot) {
        return [snapshot, array];
    });
    
}

// remove any exercise which user currently has no input for
export function DoUnavailableExercises(values) {
    var snapshot = values[0];
    var initialArray = values[1];
    let unavailable = ['gratitude', 'selfcare', 'positive', 'selflike', 'content', 'posThing'];
    snapshot.forEach((child) => {
        let childKey = child.key;
        switch(childKey) {
            case 'grateful':
                unavailable = unavailable.filter(e => e !== 'gratitude');
                break;
            case 'takeCare':
                unavailable = unavailable.filter(e => e !== 'selfcare');
                break;
            case 'pebbles':
                unavailable = unavailable.filter(e => e !== 'positive')
                break;
            case 'likeAboutSelf':
                unavailable = unavailable.filter(e => e !== 'selflike');
                break;
            case 'content':
                unavailable = unavailable.filter(e => e !== 'content');
                break;
            case 'positiveThings':
                unavailable = unavailable.filter(e => e !== 'posThing');
                break;
            default:
        }
    })
    let newArray = initialArray.filter(val => !unavailable.includes(val))
    return newArray
}
