import React from 'react';
// import './SignUpModal.css';

const SignUpModal = props => {
    return (
        <div className="modal">
            <span 
                className="close-button"
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
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="signup-username"
                        name="signup-username" 
                        value={props.signUpModal.input.username} 
                        onChange={e => props.onUsernameChange(e)} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="signup-password"
                        name="signup-password" 
                        value={props.signUpModal.input.password} 
                        onChange={e => props.onPasswordChange(e)} />
                        <br />
                    <button type="submit">Submit</button>
                </form>
            }
        </div>
    );
}

export default SignUpModal;