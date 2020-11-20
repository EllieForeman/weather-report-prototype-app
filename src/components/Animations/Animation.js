import React, { Component } from 'react'
import Lottie from 'react-lottie'
import fish from '../../animations/00_Fish_Still.json'
import environment from '../../animations/10_Neutral_BG_With_Trees.json'
import lilypad from '../../animations/Lily_Pad.json'
import roots from '../../animations/Roots.json'
import rainbowFadeIn from '../../animations/01_Rainbow_River_Fade_In.json'
import rainbowFadeOut from '../../animations/01_Rainbow_River_Fade_Out.json'
import rainbow from '../../animations/01_Rainbow_Weather_River.json'
import neutralBackground from '../../animations/10_Neutral_River_All_Assets.json'
import blueskyFadeIn from '../../animations/03_OK_Fade_In.json'
import bluesky from '../../animations/03_OK_Weather_River.json'
import blueskyFadeOut from '../../animations/03_OK_River_Fade_Out.json'
import sunshineFadeIn from '../../animations/02_Happy_River_Fade_In.json'
import sunshine from '../../animations/02_High_Weather_River.json'
import sunshineFadeOut from '../../animations/02_Happy_River_Fade_Out.json'
import lightCloudsFadeIn from '../../animations/04_Nothing_Fade_In.json'
import lightClouds from '../../animations/04_Nothing_Weather_River.json'
import lightCloudsFadeOut from '../../animations/04_Nothing_River_Fade_Out.json'
import greyCloudFadeIn from '../../animations/05_Low_Fade_In.json'
import greyCloud from '../../animations/05_Low_Weather_River.json'
import greyCloudFadeOut from '../../animations/05_Low_River_Fade_Out.json'
import darkCloudsLowFadeIn from '../../animations/06_Medium_Low_Fade_In.json'
import darkCloudsLow from '../../animations/06_Medium_Low_Weather_River.json'
import darkCloudsLowFadeOut from '../../animations/06_Medium_Low_River_Fade_Out.json'
import cloudRainThreatFadeIn from '../../animations/07_Very_Low_Fade_In.json'
import cloudRainThreat from '../../animations/07_Very_Low_v1.json'
import cloudRainThreatFadeOut from '../../animations/07_Very_Low_River_Fade_Out.json'
import tornadoFadeIn from '../../animations/08_Low_But_with_Energy_Fade_In.json'
import tornado from '../../animations/08_Low_But_with_Energy_Weather_River.json'
import tornadoFadeOut from '../../animations/08_Low_But_with_Energy_River_Fade_Out.json'
import tsunamiFadeIn from '../../animations/09_Suicidal_Fade_In.json'
import tsunami from '../../animations/09_Suicidal_Weather_River.json'
import tsunamiFadeOut from '../../animations/09_Suicidal_River_Fade_Out.json'
import fishSwimming from '../../animations/00_Fish_Swimming_across'
import riverbed from '../../animations/Riverbed.json'
import riverLevel from '../../animations/10_River_Level.json'
import neutralNoTrees from '../../animations/10_Neutral_River_No Trees.json'
import neutralTreesNoLily from '../../animations/10_Neutral Weather_River.json'
import meditation from '../../animations/11_Meditation_Screen_v1.json'

class Animation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animationData: ''
        }
    }

    componentDidMount() {
        this.chooseAnimation();
    }

    chooseAnimation = () => {
        switch(this.props.animation) {
            case 'riverbed':
                this.setState({ animationData: riverbed })
                break;
            case 'riverLevel':
                this.setState({ animationData: riverLevel })
                break;
            case 'roots':
                this.setState({ animationData: roots })
                break;
            case 'fish':
                this.setState({ animationData: fish })
                break;
            case 'fishSwimming':
                this.setState({ animationData: fishSwimming })
                break;
            case 'environment':
                this.setState({ animationData: environment })
                break;
            case 'lilypad':
                this.setState({ animationData: lilypad })
                break;
            case 'arrow':
                this.setState({ animationData: arrow })
                break;
            case 'neutralBackground':
                this.setState({ animationData: neutralBackground })
                break;
            case 'sunshine':
                this.setState({ animationData: sunshine })
                break;
            case 'sunshineFadeIn':
                this.setState({ animationData: sunshineFadeIn })
                break;
            case 'sunshineFadeOut':
                this.setState({ animationData: sunshineFadeOut })
                break;
            case 'rainbowFadeIn':
                this.setState({ animationData: rainbowFadeIn })
                break;
            case 'rainbowFadeOut':
                this.setState({ animationData: rainbowFadeOut })
                break;
            case 'rainbow':
                this.setState({ animationData: rainbow })
                break
            case 'blueskyFadeIn':
                this.setState({ animationData: blueskyFadeIn })
                break
            case 'bluesky':
                this.setState({ animationData: bluesky })
                break
            case 'blueskyFadeOut':
                this.setState({ animationData: blueskyFadeOut })
                break
            case 'highFadeIn':
                this.setState({ animationData: highFadeIn })
                break
            case 'high':
                this.setState({ animationData: high })
                break
            case 'highFadeOut':
                this.setState({ animationData: highFadeOut })
                break
            case 'light-cloudsFadeIn':
                this.setState({ animationData: lightCloudsFadeIn })
                break
            case 'light-clouds':
                this.setState({ animationData: lightClouds })
                break
            case 'light-cloudsFadeOut':
                this.setState({ animationData: lightCloudsFadeOut })
                break
            case 'grey-cloudFadeIn':
                this.setState({ animationData: greyCloudFadeIn })
                break
            case 'grey-cloud':
                this.setState({ animationData: greyCloud })
                break
            case 'grey-cloudFadeOut':
                this.setState({ animationData: greyCloudFadeOut })
                break
            case 'purple-rainFadeIn':
                this.setState({ animationData: cloudRainThreatFadeIn })
                break
            case 'purple-rain':
                this.setState({ animationData: cloudRainThreat })
                break
            case 'purple-rainFadeOut':
                this.setState({ animationData: cloudRainThreatFadeOut })
                break
            case 'turquoise-rainFadeIn':
                this.setState({ animationData: darkCloudsLowFadeIn })
                break
            case 'turquoise-rain':
                this.setState({ animationData: darkCloudsLow })
                break
            case 'turquoise-rainFadeOut':
                this.setState({ animationData: darkCloudsLowFadeOut })
                break
            case 'tsunamiFadeIn':
                this.setState({ animationData: tsunamiFadeIn })
                break
            case 'tsunami':
                this.setState({ animationData: tsunami })
                break
            case 'tsunamiFadeOut':
                this.setState({ animationData: tsunamiFadeOut })
                break
            case 'tornadoFadeIn':
                this.setState({ animationData: tornadoFadeIn })
                break
            case 'tornado':
                this.setState({ animationData: tornado })
                break
            case 'tornadoFadeOut':
                this.setState({ animationData: tornadoFadeOut })
                break
            case 'neutralNoTrees':
                this.setState({ animationData: neutralNoTrees})
                break
            case 'meditation':
                this.setState({ animationData: meditation })
                break
            case 'neutralTreesNoLily':
                this.setState({ animationData: neutralTreesNoLily })
                break
            default:
              // code block
        }
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: this.state.animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Lottie options={defaultOptions}
            speed={this.props.speed}
            isPaused={this.props.isPaused}
            />
        )
    }
}

export default Animation;