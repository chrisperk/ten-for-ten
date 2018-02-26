import React from 'react';
// import './Quiz.css';

const Quiz = props => {
    const progressBarStyle = {
        width: `${props.timeRemaining * 10}%`
    };

    return (
        <div className="quiz-box">
            <section id="timer">
                <div style={progressBarStyle} id="progress-bar"></div>
                <span id="timer-text">{props.timeRemaining}</span>
            </section>
            <section id="question">
                <div id="text">{props.question.text}</div>
                <div id="directions">{props.question.directions}</div>
                <div id="result">
                    <div className={props.question.isUserAnswerCorrect ? 'points-display visible active' : 'points-display'}>
                        <span className={props.question.isUserAnswerCorrect ? 'active' : ''}>+{props.timeRemaining} points!</span>
                    </div>
                    <span className={props.question.isUserAnswerCorrect === true ? 'active indicator correct' : 'indicator correct'}></span>
                    <span className={props.question.isUserAnswerCorrect === false ? 'active indicator incorrect' : 'indicator incorrect'}></span>
                </div>
            </section>
            <section>
                <button 
                    type="button"
                    className="startover-button" 
                    onClick={e => props.onStartOver(e)}>
                    Start Over
                </button>
            </section>
        </div>
    );
}

export default Quiz;
