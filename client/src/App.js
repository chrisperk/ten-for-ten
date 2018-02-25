import React, { Component } from 'react';
import Quiz from './components/Quiz/Quiz';
import Scores from './components/Scores/Scores';
import SignUpModal from './components/modals/SignUpModal/SignUpModal';
import LoginModal from './components/modals/LoginModal/LoginModal';
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
  activeUser: null,
  currentQuestion: null,
  currentQuestionIndex: 0,
  timeRemaining: timeAllowed,
  score: 0,
  highScores: [],
  signUpModal: {
    isShown: false,
    input: {
      username: '',
      password: ''
    }
  },
  loginModal: {
    isShown: false,
    input: {
      username: '',
      password: ''
    }
  }
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
        const newScores = this.state.highScores.concat([{
          score: this.state.score,
          key: Date.now()
        }]);
        const newState = this.state;
        newState.highScores = newScores;
        this.setState(newState);
      }
    }, 1000);
  }

  handleStartOver() {
    clearInterval(timer);
    const newState = initialState;
    newState.activeUser = this.state.activeUser;
    newState.highScores = this.state.highScores;
    const currentQuestion = newState.questions[newState.currentQuestionIndex];
    newState.currentQuestion = currentQuestion;
    this.setState(newState);
    timer = this.beginTimer();
  }

  handleOpenSignUpModal() {
    const newSignUpModalState = this.state.signUpModal;
    newSignUpModalState.isShown = true;
    this.setState({ signUpModal: newSignUpModalState });
  }

  handleSignUpUsernameChange(e) {
    const newSignUpModalState = this.state.signUpModal;
    newSignUpModalState.input.username = e.target.value;
    this.setState({ signUpModal: newSignUpModalState });
  }

  handleSignUpPasswordChange(e) {
    const newSignUpModalState = this.state.signUpModal;
    newSignUpModalState.input.password = e.target.value;
    this.setState({ signUpModal: newSignUpModalState });
  }

  handleOpenLoginModal() {
    const newLoginModalState = this.state.loginModal;
    newLoginModalState.isShown = true;
    this.setState({ loginModal: newLoginModalState });
    console.log(this.state);
  }

  handleLoginUsernameChange(e) {
    const newLoginModalState = this.state.loginModal;
    newLoginModalState.input.username = e.target.value;
    this.setState({ loginModal: newLoginModalState });
  }

  handleLoginPasswordChange(e) {
    const newLoginModalState = this.state.loginModal;
    newLoginModalState.input.password = e.target.value;
    this.setState({ loginModal: newLoginModalState });
  }

  postData(url, data) {
    return fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })
    .then(response => response.json())
    .catch(err => console.log(err));
  }

  handleSignUpSubmit(e) {
    e.preventDefault();
    console.log(e);
    this.postData('/api/signup', {
      username: this.state.signUpModal.input.username,
      password: this.state.signUpModal.input.password
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    console.log(e);
    this.postData('/api/login', {
      username: this.state.loginModal.input.username,
      password: this.state.loginModal.input.password
    })
      .then(data => {
        console.log(data);
        this.setState({activeUser: data.username});
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className={this.state.signUpModal.isShown ? "modal-wrapper active" : "modal-wrapper"}>
          <SignUpModal 
            signUpModal={this.state.signUpModal}
            onUsernameChange={this.handleSignUpUsernameChange.bind(this)}
            onPasswordChange={this.handleSignUpPasswordChange.bind(this)}
            onSignUpSubmit={this.handleSignUpSubmit.bind(this)} />
        </div>
        <div className={this.state.loginModal.isShown ? "modal-wrapper active" : "modal-wrapper"}>
          <LoginModal 
            loginModal={this.state.loginModal}
            onUsernameChange={this.handleLoginUsernameChange.bind(this)}
            onPasswordChange={this.handleLoginPasswordChange.bind(this)}
            onLoginSubmit={this.handleLoginSubmit.bind(this)} />
        </div>
        <nav className="header">
          <div className="brand">Ten for Ten</div>
          {this.state.activeUser ? 
            <div>
              <span>Logged in as {this.state.activeUser}</span>
            </div> :
            <div className="nav-buttons">
              <span onClick={this.handleOpenLoginModal.bind(this)}>Login</span>
              <span onClick={this.handleOpenSignUpModal.bind(this)}>
                Sign Up
              </span>
            </div>
          }
        </nav>
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
