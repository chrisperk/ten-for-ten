import React from 'react';
import './Quiz.css';

const Quiz = props => {
    return (
        <div className="question-wrapper">
            <main>
                <section id="timer">
                    <div id="progress-bar"></div>
                    {props.question.timeRemaining}
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
            </main>
        </div>
    );
}

export default Quiz;
