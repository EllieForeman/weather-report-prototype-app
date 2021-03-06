import React, { Component } from 'react'
import Lottie from 'react-lottie'
import arrow from '../../animations/arrow.json'

class Arrow extends React.Component {

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: arrow,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Lottie options={defaultOptions}
                speed={this.props.speed}
                isPaused={this.props.isPaused}
                width={100}
                height={100}
            />
        )
    }

}

export default Arrow;