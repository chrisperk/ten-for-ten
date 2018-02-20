import React from 'react';
import './Scores.css';

const Scores = props => {
    return (
        <ol>
            {props.scores.map(score => {
                return <li key={score.key}>{score.score}</li>;
            })}
        </ol>
    );
}

export default Scores;