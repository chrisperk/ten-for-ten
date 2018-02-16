import React, { Component } from 'react';
import Quiz from './components/Quiz/Quiz';
import './App.css';

let timer;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          text: 'What is 2 + 2?',
          answer: 4,
          directions: '(Press 0-9 on keyboard to answer.)',
          timeRemaining: 10,
          isUserAnswerCorrect: null
        },
        {
          text: 'What is 4 + 4?',
          answer: 8,
          directions: '(Press 0-9 on keyboard to answer.)',
          timeRemaining: 10,
          isUserAnswerCorrect: null
        }
      ],
      currentQuestion: null,
      currentQuestionIndex: 0,
      score: 0,
      userAnswer: null,
      users: []
    }
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleUserAnswer.bind(this));
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    this.setState({ currentQuestion });
  }

  componentDidMount() {
    fetch('/dilly')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    timer = this.beginTimer();
    console.log(timer);
  }

  beginTimer() {
    return setInterval(
      () => {
        const currentQuestion = this.state.currentQuestion;
        if (currentQuestion.timeRemaining > 0) {
          currentQuestion.timeRemaining = currentQuestion.timeRemaining - 1;
          this.setState({ currentQuestion });
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
      console.log('correct');
      currentQuestion.isUserAnswerCorrect = true;
      this.setState({ 
        currentQuestion,
        score: this.state.score + (currentQuestion.timeRemaining)
      });
      console.log(this.state.score);
      this.proceedToNextQuestion();
    } else {
      console.log('incorrect');
      currentQuestion.isUserAnswerCorrect = false;
      this.setState({ currentQuestion });
      this.proceedToNextQuestion();
    }
  }

  proceedToNextQuestion() {
    setTimeout(() => {
      if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
        this.setState({
          currentQuestionIndex: this.state.currentQuestionIndex + 1
        });
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
        this.setState({ currentQuestion });
        timer = this.beginTimer();
      }
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        <Quiz 
          question={this.state.currentQuestion}
        />
      </div>
    );
  }
}

export default App;
