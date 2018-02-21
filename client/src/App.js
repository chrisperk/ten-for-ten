import React, { Component } from 'react';
import Quiz from './components/Quiz/Quiz';
import Scores from './components/Scores/Scores';
import './App.css';

let timer;
const timeAllowed = 10;
const initialState = {
  questions: [
    {
      text: 'What is 2 + 2?',
      answer: 4,
      directions: '(Press 0-9 on keyboard to answer.)',
      isUserAnswerCorrect: null
    },
    {
      text: 'What is 4 + 4?',
      answer: 8,
      directions: '(Press 0-9 on keyboard to answer.)',
      isUserAnswerCorrect: null
    }
  ],
  currentQuestion: null,
  currentQuestionIndex: 0,
  timeRemaining: timeAllowed,
  score: 0,
  highScores: []
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = JSON.parse(JSON.stringify(initialState));
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleUserAnswer.bind(this));
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    this.setState({ currentQuestion });
  }

  componentDidMount() {
    // fetch('/dilly')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
    timer = this.beginTimer();
  }

  beginTimer() {
    return setInterval(
      () => {
        let timeRemaining = this.state.timeRemaining;
        if (timeRemaining > 0) {
          timeRemaining -= 1;
          this.setState({ timeRemaining });
        } else {
          clearInterval(timer);
          this.proceedToNextQuestion();
        }   
      }, 1000);
  }

  handleUserAnswer(e) {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    const input = parseInt(e.key, 10);
    const keyChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (!keyChoices.includes(input)) return;
    clearInterval(timer);
    if (input === currentQuestion.answer) {
      currentQuestion.isUserAnswerCorrect = true;
      this.setState({ 
        currentQuestion,
        score: this.state.score + (this.state.timeRemaining)
      });
      this.proceedToNextQuestion();
    } else {
      currentQuestion.isUserAnswerCorrect = false;
      this.setState({ currentQuestion });
      this.proceedToNextQuestion();
    }
  }

  proceedToNextQuestion() {
    setTimeout(() => {
      const currentIndex = this.state.currentQuestionIndex;
      const newIndex = currentIndex + 1;
      const questions = this.state.questions;

      if (currentIndex < questions.length - 1) {
        this.setState({ currentQuestionIndex: newIndex });
        const currentQuestion = questions[newIndex];
        this.setState({ currentQuestion, timeRemaining: timeAllowed });
        timer = this.beginTimer();
      } else {
        console.log(this.state.highScores, this.state.score);
        const newScores = this.state.highScores.concat([{
          score: this.state.score,
          key: Date.now()
        }]);
        console.log(newScores);
        const newState = this.state;
        newState.highScores = newScores;
        console.log(newState);
        this.setState(newState);
        console.log(this.state.highScores);
      }
    }, 1000);
  }

  handleStartOver() {
    console.log('resetting');
    clearInterval(timer);
    const newState = initialState;
    newState.highScores = this.state.highScores;
    console.log(initialState);
    console.log(newState.questions);
    const currentQuestion = newState.questions[newState.currentQuestionIndex];
    newState.currentQuestion = currentQuestion;
    this.setState(newState);
    console.log(this.state.currentQuestion);
    timer = this.beginTimer();
    console.log('end');
    console.log(this.state.currentQuestion);
  }

  render() {
    return (
      <div className="App">
      <div className="header"></div>
        <div className="quiz-wrapper">
          <Quiz 
            question={this.state.currentQuestion}
            timeRemaining={this.state.timeRemaining}
            onStartOver={this.handleStartOver.bind(this)}
          />
        </div>
        <div className="scores-wrapper">
          <Scores 
            scores={this.state.highScores}
          />
        </div>
      </div>
    );
  }
}

export default App;
