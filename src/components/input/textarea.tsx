import { FocusEventHandler, KeyboardEventHandler, useState } from "react";
import styles from "./input.module.css";
import { useCallback } from "react";

type TTextareaProps = {
    className?: string;
    onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
    // id: string,
    // label: string,
    name: string;
};

export default function Textarea({
    className,
    onKeyDown,
    ...options
}: TTextareaProps) {
    const [RowsState, setRowsState] = useState(1);

    const handleTextareaFocus = useCallback(() => {
        setRowsState(2);
    }, [RowsState]);

    const handleTextareaBlur: FocusEventHandler<HTMLTextAreaElement> =
        useCallback(
            (event) => {
                if (!event.target.value) {
                    setRowsState(1);
                }
            },
            [RowsState]
        );

    return (
        <div className={[className, styles.inputContainer].join(" ")}>
            <textarea
                className={[styles.input, styles.textarea].join(" ")}
                placeholder=" "
                rows={RowsState}
                {...options}
                onFocus={handleTextareaFocus}
                onBlur={handleTextareaBlur}
                onKeyDown={onKeyDown}
            ></textarea>
            {/* <label className={styles.label} htmlFor={options.id}>{label}</label> */}
        </div>
    );
}
