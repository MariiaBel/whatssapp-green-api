import { useState } from "react"
import styles from './input.module.css'
import { useCallback } from "react"

type TTextareaProps = {
    className?: string,
    // id: string, 
    // label: string,
    name: string,
}

export default function Textarea({className,  ...options }:TTextareaProps) {
    const [RowsState, setRowsState] = useState(1)

    const handleTextareaFocus = useCallback(() => {
        setRowsState(2)
    }, [RowsState])

    const handleTextareaBlur = useCallback((event: React.FocusEventHandler<HTMLTextAreaElement>) => {
        if(!event.target?.value) {
            setRowsState(1)
        }
    }, [RowsState])

    return (
        <div className={[className, styles.inputContainer].join(' ')}>
            <textarea className={[styles.input, styles.textarea].join(' ')} placeholder=" "  rows={RowsState} {...options} onFocus={handleTextareaFocus} onBlur={handleTextareaBlur}></textarea>
            {/* <label className={styles.label} htmlFor={options.id}>{label}</label> */}
        </div>
    )
}