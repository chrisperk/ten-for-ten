import React from 'react';
import './Quiz.css';

const Quiz = props => {
    return (
        <div className="question-wrapper">
            <main onClick={e => props.onUserAnswer(e)}>
                <section id="timer">
                    <div id="progress-bar"></div>
                    {props.question.timeRemaining}
                </section>
                <section id="question">
                    <div id="text">{props.question.text}</div>
                    <div id="directions">{props.question.directions}</div>
                    <div id="result">
                        <span id="correct"></span>
                        <span id="incorrect"></span>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Quiz;
