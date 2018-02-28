import React from 'react';
// import './SignUpModal.css';

const SignUpModal = props => {
    return (
        <div className={props.signUpModal.isShown ? "modal active" : "modal"}>
            <span 
                className="close-button"
                aria-label="Close Sign Up Modal"
                onClick={e => props.onCloseModal(e)}>
                &times;
            </span>
            <h1>Sign Up</h1>
            {props.activeUser ?
                <div>
                    <div>Thank you for signing up!</div>
                    <div>Logged in as {props.activeUser}</div>
                </div> :
                <form onSubmit={props.onSignUpSubmit}>
                    <input 
                        type="text"
                        id="signup-username"
                        name="signup-username" 
                        placeholder="Username"
                        value={props.signUpModal.input.username} 
                        onChange={e => props.onUsernameChange(e)} />
                    <input 
                        type="password"
                        id="signup-password"
                        name="signup-password"
                        placeholder="Password" 
                        value={props.signUpModal.input.password} 
                        onChange={e => props.onPasswordChange(e)} />
                    <button 
                        type="submit" 
                        className="submit-button">
                        Submit
                    </button>
                </form>
            }
        </div>
    );
}

export default SignUpModal;