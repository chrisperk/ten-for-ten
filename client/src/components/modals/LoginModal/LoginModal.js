import React from 'react';
import './LoginModal.css';

const LoginModal = props => {
    return (
        <div className="modal">
            <h1>Login</h1>
            <form onSubmit={props.onLoginSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    name="username" 
                    value={props.loginModal.input.username} 
                    onChange={e => props.onUsernameChange(e)} />
                <br />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    id="password"
                    name="password" 
                    value={props.loginModal.input.password} 
                    onChange={e => props.onPasswordChange(e)} />
                    <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginModal;