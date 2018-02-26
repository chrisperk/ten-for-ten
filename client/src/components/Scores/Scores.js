import React from 'react';
import './Scores.css';

const Scores = props => {
    return (
        <div className="scores-panel">
            <div>High Scores</div>
            <ol>
                {props.scores.map(score => {
                    return <li key={score._id}>{score.username} - {score.score}</li>;
                })}
            </ol>
        </div>
    );
}

export default Scores;