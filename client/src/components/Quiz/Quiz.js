import React from 'react';
import './Quiz.css';

const Quiz = props => {
    const progressBarStyle = {
        width: `${props.timeRemaining * 10}%`
    };

    return (
        <div className="question-wrapper">
            <main>
                <section id="timer">
                    <div style={progressBarStyle} id="progress-bar"></div>
                    <span id="timer-text">{props.timeRemaining}</span>
                </section>
                <section id="question">
                    <div id="text">{props.question.text}</div>
                    <div id="directions">{props.question.directions}</div>
                    <div id="result">
                        <span className={props.question.isUserAnswerCorrect === true ? 'visible' : ''}>
                            Correct
                        </span>
                        <span className={props.question.isUserAnswerCorrect === false ? 'visible' : ''}>
                            Incorrect
                        </span>
                    </div>
                </section>
                <section>
                    <button type="button" onClick={e => props.onStartOver(e)}>Start Over</button>
                </section>
            </main>
        </div>
    );
}

export default Quiz;