import { Breathing, Meditating, Grounding } from './TextBasedExercises';
import Gratitude from './ReplayGratitude';
import PositiveMemory from './ReplayPosMemories';
import LikeAboutSelf from './ReplayLikeAboutSelf';
import React from 'react';

export const SetExercises = (exercise) => {
    if (exercise == 'breathing') {
        return Breathing();
    }
    if (exercise == 'meditating') {
        return Meditating();
    }
    if (exercise == 'grounding') {
        return Grounding();
    }
    if (exercise == 'gratitude') {
        return <Gratitude onClick={this.props.buttonClick}/>;
    }
    if (exercise == 'positive') {
        return <PositiveMemory />
    }
    if (exercise === 'selflike') {
        return <LikeAboutSelf />
    }
}