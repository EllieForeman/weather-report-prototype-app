import React from 'react';
import EntryForm from '../Edits/EntryForm';
import { connect } from 'react-redux';
import { startAddEntry, startEditEntry } from '../../actions/entries'
import BackgroundAnimation from '../Animations/BackgroundAnimation'
import ForegroundAnimation from '../Animations/ForegroundAnimation'
const firebase = require('firebase/app');
require('firebase/auth');
import database from '../../firebase/firebase';

export class ChooseSymbolPage extends React.Component {
    onSubmit = (entry) => {
        //create new entry
        this.props.startAddEntry(entry);
        //get current user
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        let name = '';
        //get id for the new entry
        database.ref(`users/${uid}/entries`).orderByChild('createdAt').limitToLast(1).on('child_added', function(snapshot) {
            name = snapshot.key;
        })
        //go to page for most recent entry
        this.props.history.push(`edit/${name}`);
    };

    render() {
        let script = require('../../../src/data/script.json');
        let question = (script[0].intro[2]);
        return (
            <div className='background-box'>
                <div className='background-anim'>
                    <BackgroundAnimation />
                </div>
                <div className='foreground-anim'>
                    <ForegroundAnimation />
                </div>
                <div className='info-box'>
                    <h2 className='info-box-text'>{ question }</h2>
                    <EntryForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        entry: state.entries.find((entry) => entry.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({

    startAddEntry: (entry) => dispatch(startAddEntry(entry)),
    startEditEntry: (id, entry) => dispatch(startEditEntry(id, entry))


});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSymbolPage);