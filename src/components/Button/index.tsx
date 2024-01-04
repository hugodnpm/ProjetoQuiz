import { ButtonHTMLAttributes } from 'react'
import S from './styles.module.css'

type ButtonsProps = ButtonHTMLAttributes<HTMLButtonElement>
export function Button(props: ButtonsProps) {
    return (
        <button className={S.container} {...props} >{props.children}</button>
    )
}
