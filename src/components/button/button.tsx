import styles from './button.module.css'
import { ReactNode } from 'react';

type TButtonProps = {
    children: ReactNode,
    type: 'button' | 'reset' | 'submit',
    className: string
}

export default function Button({children, type="button", className}: TButtonProps) {
    return <button className={[styles.btn, className].join(' ')} type={type}>{children}</button>
}