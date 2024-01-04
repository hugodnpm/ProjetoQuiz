import { useState } from 'react'
import {QuestionAnswer} from '../QuestionAnswer'
import S from './styles.module.css'

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
        question: 'Torço para qual time?',
        answers: ['Vasco da Gama', 'Sport Club', 'Botafogo', 'Grêmio'],
        correctAnswer:'Vasco da Gama'
    },
]


export function Quiz () {
    const currentQuestion = QUESTIONS[0]
    const [correctAnswerCout, setCorrectAnswerCout] = useState(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)

    const handleAnswerQuestion = (event, question, answer) => {
        if (isCurrentQuestionAnswered){
            return
        }
        const isCorrectAnswer = question.correctAnswer === answer
        const resultClassname = isCorrectAnswer ? S.correct : S.incorrect
        event.currentTarget.classList.toggle(resultClassname)

        if (isCorrectAnswer){
            setCorrectAnswerCout(correctAnswerCout + 1)
        }
        setIsCurrentQuestionAnswered(true)
    }
    return (
        <div className={S.container}>
          <div className={S.card}>
            <div className={S.quiz}>
                <header className={S.quizHeader}>
                    <span className={S.questionCount}>PERGUNTA 1/3</span>
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
            </div>
          </div>
        </div>
    )
}
