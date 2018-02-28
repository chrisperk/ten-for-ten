import React from 'react';
import './LoginModal.css';

const LoginModal = props => {
    return (
        <div className={props.loginModal.isShown ? "modal active" : "modal"}>
            <span 
                className="close-button"
                aria-label="Close Login Modal"
                onClick={e => props.onCloseModal(e)}>
                &times;
            </span>
            <h1>Login</h1>
            {props.activeUser ?
                <div>
                    Logged in as {props.activeUser}
                </div> :
                <form onSubmit={props.onLoginSubmit}>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username" 
                        value={props.loginModal.input.username} 
                        onChange={e => props.onUsernameChange(e)} />
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password" 
                        value={props.loginModal.input.password} 
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

export default LoginModal;