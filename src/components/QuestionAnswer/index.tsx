import { MouseEvent } from 'react'
import S from './styles.module.css'
import { Question } from '../Quiz'


interface QuestionAnswerprops {
    answer: string
    question: Question
    handleAnswerQuestion: (event: MouseEvent<HTMLButtonElement>, question: Question, answer: string) => void
}

export function QuestionAnswer(props: QuestionAnswerprops) {
    return (
        <button
            className={S.container}
            onClick={(event) => props.handleAnswerQuestion(event, props.question, props.answer)}
        >{props.answer}
        </button>
    )
}
