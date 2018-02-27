import React from 'react';
// import './Quiz.css';

const Quiz = props => {
    const progressBarStyle = {
        width: `${props.timeRemaining * 10}%`
    };
    const inputs = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]];

    return (
        <div className="quiz-box">
            <section id="timer">
                <div style={progressBarStyle} id="progress-bar"></div>
                <span id="timer-text">{props.timeRemaining}</span>
            </section>
            {!props.isComplete ?
                <section id="question">
                    <div id="text">{props.question.text}</div>
                    <div id="directions">{props.question.directions}</div>
                    <div id="numbers-input">
                        {inputs.map(set => {
                            return <div key={inputs.indexOf(set)}>
                                {set.map(input => <span onClick={props.onKeypadInput} key={input}>{input}</span>)}
                            </div>
                        })}
                    </div>
                    <div id="result">
                        <div className={props.question.isUserAnswerCorrect ? 'points-display visible active' : 'points-display'}>
                            <span className={props.question.isUserAnswerCorrect ? 'active' : ''}>+{props.timeRemaining} points!</span>
                        </div>
                        <div className="indicator-wrapper">
                            <span className={props.question.isUserAnswerCorrect === true ? 'active indicator correct' : 'indicator correct'}></span>
                            <span className={props.question.isUserAnswerCorrect === false ? 'active indicator incorrect' : 'indicator incorrect'}></span>
                        </div>
                    </div>
                </section> :
                <section>
                    <div>Your Score: {props.score}</div>
                </section>
            }
            
            <section id="startover">
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
