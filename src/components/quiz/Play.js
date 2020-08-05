import React, { Component, Fragment } from 'react'
import questions from '../../questions.json'
import M from 'materialize-css'
import isEmpty from '../../utils/is-Empty';




export default class Play extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberofQuestions: 0,
            numberofAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            time: {}
        }

        this.interval = null
    }

    componentDidMount() {
        const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion )
        this.startTimer()
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let {currentQuestionIndex} = this.state
        if(!isEmpty(this.state.questions)) {
            questions = this.state.questions
            currentQuestion = questions[currentQuestionIndex]
            nextQuestion=questions[currentQuestionIndex + 1]
            previousQuestion = questions[currentQuestionIndex - 1]
            const answer = currentQuestion.answer

            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
            })
        }
    }

    handleOptionClick = (e) => {
       if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
           this.correctAnswer()
       }else {
           this.wrongAnswer()
       }
    }

    handleNextButtonClick = () => {
        if(this.state.nextQuestion !== undefined) {
           this.setState(prevState => ({
               currentQuestionIndex: prevState.currentQuestionIndex + 1
           }), () => {
               this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)

           })
        }
    }

    handlePreviousButtonClick = () => {
        if(this.state.previousQuestion !== undefined) {
           this.setState(prevState => ({
               currentQuestionIndex: prevState.currentQuestionIndex + 1
           }), () => {
               this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)

           })
        }
    }

    handleButtonClick = (e) => {
        //
        switch(e.target.id) {
            case 'next-button':
                this.handleNextButtonClick()
                break

            case 'previous-button':
                this.handlePreviousButtonClick()
                break

            default:
                break
        }
    };

    playButtonSound = () => {
        //
    }

    correctAnswer = () => {
        M.toast({
            html: 'correct answer',
            classes: 'toast-valid',
            displayLength: 1500
        })
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestion: prevState.numberofAnsweredQuestions + 1
        }), () => {
            if(this.state.nextQuestion === undefined) {
                this.endGame()
            }else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
           
        })
    }

    wrongAnswer = () => {
        navigator.vibrate(1000)
        M.toast({
            html: 'wrong answer',
            classes: 'toast-invalid',
            displayLength: 1500
        })
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestion: prevState.numberofAnsweredQuestions + 1
        }), () => {
            if(this.state.nextQuestion === undefined) {
                this.endGame()
            }else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
            
        })
    }

    handleHint = () => {
        const options = Array.from(document.querySelector('.options'))
        let indexofAnswer;

        options.forEach((option, index) => {
            if(option.innerHTML.toLowerCase() === this.answer.toLowerCase())
            index = indexofAnswer
        })
    }

    startTimer = () => {
        const countDownTime = Date.now() + 1800000;
        this.interval = setInterval(() => {
            const now = new Date()
            const distance = countDownTime - now

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / (1000 * 60))

            if(distance < 0) {
                clearInterval(this.interval) 
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame()
                    alert('quiz has ended')
                    this.props.history('/')
                })
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        })
    }

    endGame = () => {
        alert('Quiz has ended')
        const {state} = this
        const playerStats = {
            score: state.score,
            numberofQuestions: state.numberofQuestions,
            numberofAnsweredQuestion: state.numberofAnsweredQuestion,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        }

        console.log(playerStats)
        setTimeout(() => {
            this.props.history.push('/')
        }, 1000)
    }


    render() {
        const {currentQuestion, currentQuestionIndex, time} = this.state
        return (
            <Fragment>
              <div className="questions">
                  <div className="lifeline-container">
                      <p>
                          <span className='mdi mdi-set-center mdi-24px' lifeline-icon></span> <span className='lifeline'>5</span>
                      </p>
                      <p>
                          <span className='mdi mdi-lightbulb-on-outline mdi-24px' lifeline-icon></span> <span className="lifeline">5</span>
                      </p>
                  </div>
                  <div>
                      <p>
                          <span>{currentQuestionIndex + 1} of 15</span>
                         {time.minutes}:{time.seconds}<span className='mdi mdi-clock-ouline mdi-24px'></span>
                      </p>
                  </div>
                <h5>{currentQuestion.question}</h5>
                  <div className="options-container">
                      <p onClick={this.handleOptionClick} className="options">{currentQuestion.optionA}</p>
                      <p onClick={this.handleOptionClick} className="options">{currentQuestion.optionB}</p>
                  </div>
                  
                  <div className="options-container">
                      <p onClick={this.handleOptionClick} className="options">{currentQuestion.optionC}</p>
                      <p onClick={this.handleOptionClick} className="options">{currentQuestion.optionD}</p>
                  </div>

                  <div className="button-container">
                      <button id='previous-button' onClick = {this.handleButtonClick}>previous</button>
                      <button id='next-button' onClick = {this.handleButtonClick}>next</button>
                      <button id='quit-button' onClick = {this.handleButtonClick}>quit</button>
                  </div>
              </div>
            </Fragment>
        )
    }
}
