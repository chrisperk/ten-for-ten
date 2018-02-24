import React from 'react';
import './SignUpModal.css';

const SignUpModal = props => {
    return (
        <div className="modal">
            <form onSubmit={props.onSignUpSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    name="username" 
                    value={props.signUpModal.input.username} 
                    onChange={e => props.onUsernameChange(e)} />
                <br />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    id="password"
                    name="password" 
                    value={props.signUpModal.input.password} 
                    onChange={e => props.onPasswordChange(e)} />
                    <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUpModal;