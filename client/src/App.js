import React, { Component } from 'react';
import Quiz from './components/Quiz/Quiz';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          text: 'What is 2 + 2?',
          answer: 4,
          directions: '(Press 0-9 on keyboard to answer.)',
          timeRemaining: 10
        },
        {
          text: 'What is 4 + 4?',
          answer: 8,
          directions: '(Press 0-9 on keyboard to answer.)',
          timeRemaining: 10
        }
      ],
      currentQuestion: 0,
      score: 0,
      userAnswer: null,
      users: []
    }
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleUserAnswer.bind(this));
  }

  componentDidMount() {
    fetch('/dilly')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    setInterval(
      () => {
        if (this.state.question.timeRemaining > 0) {
          this.setState({ 
            question: {
              timeRemaining: this.state.question.timeRemaining - 1,
              text: this.state.question.text,
              directions: this.state.question.directions,
              answer: this.state.question.answer
            }
          })
        }    
      }, 1000);
  }

  handleUserAnswer(e) {
    console.log(this);
    const input = parseInt(e.key, 10);
    const keyChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (!keyChoices.includes(input)) return;
    if (input === this.state.question.answer) {
      console.log('correct');
    } else {
      console.log('incorrect');
    }
  }

  render() {
    return (
      <div className="App">
        <Quiz 
          question={this.state.question}
        />
      </div>
    );
  }
}

export default App;
