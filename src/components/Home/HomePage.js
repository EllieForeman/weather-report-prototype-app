import React from 'react';
import { AnimationsLayered } from '../SharedComponents/SharedComponents'
import Animation from '../../components/Animations/Animation'
import { FishModal, AnchorsModal, PebblesModal } from '../SharedComponents/HomeComponents'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Fish: false,
            weather: this.props.location.state ? this.props.location.state.weather : 'neutralBackground',
            showButton: false,
            tornadoFadeOut: false,
            tsunamiFadeOut: false,
            backToNeutral: false
        }
    }

    componentDidMount() {
        const rand = Math.random() * (30000 - 15000) + 15000 // random between 15 and 30 seconds for fish appearing
        let intervalId = setInterval(() => {
            this.setState(prevState => {
                if (prevState.Fish === true) {
                    this.hideButton()
                    return {
                        Fish: false
                    };
                } else {
                    this.showButton()
                    return {
                        Fish: true,
                    };
                }
            });

        }, rand);

        this.setState({
            intervalId
        });
        if (!this.state.weather ) {
            this.setState({ weather: 'neutralBackground' })
        }
        if (this.state.weather == "tornado") {
            setTimeout( () => { this.setState({ tornadoFadeOut: true }) }, 29800)
            setTimeout( () => { this.setState({ backToNeutral: true, tornadoFadeOut: false }) }, 30500)
        }
        if (this.state.weather == "tsunami") {
            setTimeout( () => { this.setState({ tsunamiFadeOut: true }) }, 29800)
            setTimeout( () => { this.setState({ backToNeutral: true, tsunamiFadeOut: false }) }, 38500)
        }
    }

    showButton() {
        setTimeout( () => { this.setState({ showButton: true }) }, 3500)
    }

    hideButton() {
        this.setState({ showButton: false })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        let tornadoFadeOut = this.state.tornadoFadeOut ? <AnimationsLayered speeds={[0.8]} animations={['tornadoFadeOut']} /> : ''
        let tsunamiFadeOut = this.state.tsunamiFadeOut ? <AnimationsLayered speeds={[0.8]} animations={['tsunamiFadeOut']} /> : ''
        let backToNeutral = this.state.backToNeutral ? <AnimationsLayered speeds={[0.8]} animations={['neutralBackground']} /> : ''
        return (
            <div>
                <AnimationsLayered speeds={[0.8]} animations={[this.state.weather]} />
                { tornadoFadeOut } 
                { tsunamiFadeOut }
                { backToNeutral }
                <AnchorsModal />
                <PebblesModal />
                {(this.state.Fish) ? 
                <div className='anim-0'><Animation animation='fishSwimming'/></div>
                : ''}                
                <FishModal fishAppears={this.state.showButton} />
            </div>
        );
    }
}

export default HomePage;