import { useState } from 'react'
import {QuestionAnswer} from '../QuestionAnswer'
import S from './styles.module.css'
import { Button } from '../Button'
import {Result} from '../Result'
import {ProgressBar} from '../ProgressBar'

const QUESTIONS = [
    {
        id: 1,
        question: 'Qual é o meu nome?',
        answers: ['Miguel', 'Luis', 'Hugo', 'Ana'],
        correctAnswer:'Hugo'
    },
    {
        id: 2,
        question: 'Qual é a minha idade?',
        answers: ['12', '35', '43', '26'],
        correctAnswer:'43'
    },
    {
        id: 3,
        question: 'O que eu sou?',
        answers: ['Desenvolvedor', 'Vendedor', 'Gerente', 'Bombeiro'],
        correctAnswer:'Desenvolvedor'
    },
    {
        id: 4,
        question: 'Qual o meu time?',
        answers: ['Vasco da Gama', 'Sport Club', 'Botafogo', 'Grêmio'],
        correctAnswer:'Vasco da Gama'
    },
]


export function Quiz () {
    const [correctAnswerCount, setcorrectAnswerCount] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)
    const [isTakingQuiz, setIsTakingQuiz] = useState(true)
    const currentQuestionNumber = currentQuestionIndex + 1
    const quizSize = QUESTIONS.length

    const handleAnswerQuestion = (event, question, answer) => {
        if (isCurrentQuestionAnswered){
            return
        }
        const isCorrectAnswer = question.correctAnswer === answer
        const resultClassname = isCorrectAnswer ? S.correct : S.incorrect
        event.currentTarget.classList.toggle(resultClassname)

        if (isCorrectAnswer){
            setcorrectAnswerCount(correctAnswerCount + 1)
        }
        setIsCurrentQuestionAnswered(true)
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < quizSize){
            setCurrentQuestionIndex(index => index+1)
        }else{
            setIsTakingQuiz(false)
        }
        setIsCurrentQuestionAnswered(false)
    }

    const handleTryAgain = () => {
        setIsTakingQuiz(true)
        setcorrectAnswerCount(0)
        setCurrentQuestionIndex(0)
        setIsCurrentQuestionAnswered(false)
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex]
    const navigationButtonText = currentQuestionNumber === quizSize ? 'Ver Resultado' : 'Próxima Pergunta'
    return (
        <div className={S.container}>
          <div className={S.card}>
            {isTakingQuiz ? (<div className={S.quiz}>
          <ProgressBar size={quizSize} currentStep={currentQuestionNumber} />
                <header className={S.quizHeader}>
                    <span className={S.questionCount}>PERGUNTA {currentQuestionNumber}/{quizSize}</span>
                        <p className={S.question}>{currentQuestion.question}</p>

                </header>
                <ul className={S.answers}>
                {currentQuestion.answers.map(answer => (
                    <li key={answer} className={S.answerItem}>
                    <QuestionAnswer
                    answer={answer}
                    question={currentQuestion}
                    handleAnswerQuestion={handleAnswerQuestion}
                    />
                    </li>
                ))}
                </ul>
                {isCurrentQuestionAnswered && (
                <Button onClick={handleNextQuestion} >{navigationButtonText}</Button>

                )}
            </div>):(
                <Result
                    correctAnswersCount={correctAnswerCount}
                    quizSize={quizSize}
                    handleTryAgain={handleTryAgain}

            />)}
          </div>
        </div>
    )
}
