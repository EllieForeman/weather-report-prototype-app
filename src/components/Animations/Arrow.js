import React from 'react'
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
                width={80}
                height={80}
            />
        )
    }

}

export default Arrow;