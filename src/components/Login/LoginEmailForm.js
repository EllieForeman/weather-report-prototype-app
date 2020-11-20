const firebase = require('firebase/app')
import React from 'react'
import { connect } from 'react-redux'
import { startEmailLogin } from '../../actions/auth'
import PropTypes from 'prop-types'
import '../../styles/components/_button.scss';
import { CSSTransition } from "react-transition-group";
import '../../styles/animation.css';
import Animation from '../Animations/Animation'

export class LoginEmailForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: false,
            loading: false,
            email: '',
            password: '',
            isPasswordShown: false,
            appIntro: true,
            showLogin: null,
            showEnterEmail: false,
            showForgotPassword: false,
            resetSuccess: false,
            message: ""
        }
        this.triggerTimeout = this.triggerTimeout.bind(this);
    }

    triggerTimeout(itemToFadeOut) {
        const fadeTime = 3000;
        setTimeout(() => { this.setState({ [itemToFadeOut]: false }) }, fadeTime)
    }

    setStateProperty = (value, property) => {
        this.setState(() => {
        const state = {}
        state[property] = value
        return state
        })
    }

    onFormSubmit = (ev) => {
        ev.preventDefault()
        const { email, password } = this.state
        this.setState(() => ({ loading: true }))
        this.props.startEmailLogin(email, password).catch((fail) => {
            const error = 'Invalid email and/or password.'
            this.setState(() => ({ error, loading: false }))
        })
    }

    togglePasswordVisiblity = () => {
        const { isPasswordShown } = this.state;
        this.setState({ isPasswordShown: !isPasswordShown });
    };

    showLoginForm = () => {
        this.setState({ showLogin: true });
    }

    showForgottenPassword() {
        this.setState({ showForgotPassword: true, message: '' });
    }

    emailSent() {
        this.setState({ resetSuccess: false, showForgotPassword: false });
    }

    passwordReset = (email) => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            this.setState(() => ({ resetSuccess: true }))
        })
        .catch((error) => {
            if (email.length > 1) {
                this.setState(() => ({ message: 'There has been a problem, please try again' }))
            }
            this.setState(() => ({ resetSuccess: false }))
        });
    }



  render () {
    const { isPasswordShown } = this.state;
    const { error, loading } = this.state
    const { goBackFunction } = this.props

    return (
      <div className='background-box'>
            <div className="background-box"></div>
            <div className='anim-full-height'><Animation speed={0.2} animation={"neutralNoTrees"} /></div>
            <div className='info-box-login'>
                <CSSTransition in={this.state.appIntro} timeout={1000} classNames="transform-up" appear onEntered={() => { this.triggerTimeout('appIntro') }} onExited={() => this.showLoginForm()}>
                    <h2 className='box-layout__title'><b>WEATHER REPORT</b></h2>
                </CSSTransition>
                <CSSTransition in={this.state.showLogin} timeout={1000} classNames="fade-fast" unmountOnExit>
                    <div>
                        <form className='form' onSubmit={this.onFormSubmit}>
                            <div className="wrap-input100">
                                <input
                                    onChange={(ev) => this.setStateProperty(ev.target.value, 'email')}
                                    placeholder={this.state.showForgotPassword ? 'Enter your email address here' : 'Username*' }
                                    aria-label='Email'
                                    type='text'
                                    name='email'
                                    required = '*Required'
                                    className='form-input'
                                />
                            </div>
                            <p className={this.state.showForgotPassword && !this.state.resetSuccess ? 'error-message-text' : 'button-display-none'}>{this.state.showForgotPassword ? this.state.message : ''}</p>
                            <p className={this.state.resetSuccess ? 'error-message-text' : 'button-display-none'}>{this.state.resetSuccess ? 'Password Reset Email Sent' : ''}</p>
                            <div className={this.state.showForgotPassword ? 'button-display-none' : 'wrap-input100 validate-input'}>
                                <input
                                    onChange={(ev) => this.setStateProperty(ev.target.value, 'password')}
                                    placeholder='Password*'
                                    aria-label='Password'
                                    type={isPasswordShown ? "text" : "password"}
                                    name='password'
                                    // required = '*Required'
                                    className='form-input validate-input'
                                />
                                <i
                                    className={isPasswordShown ? "fas fa-eye-slash password-icon" : "fas fa-eye password-icon"}
                                    onClick={this.togglePasswordVisiblity}
                                />
                            </div>
                            {/* <div className={this.state.showForgotPassword ? 'button-display-none' : ''}>
                                { error && <p className='form__error'>{error}</p> }
                            </div> */}
                            <button type='submit' className={this.state.showForgotPassword ? 'button-display-none' : 'button login-button'} disabled={loading}>
                                { loading ? '...' : 'NEXT' }
                            </button>
                            {this.state.resetSuccess == false ?
                                <button className={this.state.showForgotPassword ? 'button reset-password-button' : 'button-display-none' } onClick={() => this.passwordReset(this.state.email)}>Reset Password</button>  
                            :
                                <button className={this.state.showForgotPassword ? 'button reset-password-button' : 'button-display-none' }  onClick={() => this.emailSent()}>Back to Login</button>
                            }  
                            { goBackFunction &&
                            <button className='button button--secondary' onClick={goBackFunction}>Cancel</button> }
                        </form>
                        {<button className={this.state.showForgotPassword ? 'button-display-none' : 'button button--password-reset'} onClick={this.showForgottenPassword.bind(this)}>Forgot Password?</button>}  
                        {<p className={this.state.showForgotPassword ? '' : 'button-display-none'}>If you are having any further problems, please email <a href="info@studiomeineck.com">info@studiomeineck.com</a></p>}  
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEmailLogin: (emai, password) => dispatch(startEmailLogin(emai, password))
})

export default connect(undefined, mapDispatchToProps)(LoginEmailForm)
