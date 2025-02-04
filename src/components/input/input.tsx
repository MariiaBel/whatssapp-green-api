import { useState, useCallback, useEffect } from "react";
import styles from "./input.module.css";

type TInputProps = {
    className?: string;
    isError: boolean;
    id: string;
    label: string;
    name: string;
    type: string;
};

export default function Input({
    className,
    isError = false,
    ...options
}: TInputProps) {
    const [inputsState, setInputsState] = useState({
        class: "",
    });

    useEffect(() => {
        setInputsState({
            ...inputsState,
            class: isError ? styles.error : "",
        });
    }, [isError]);

    const handlePhoneFocus = useCallback(() => {
        setInputsState({
            ...inputsState,
            class: "",
        });
    }, [inputsState]);

    const handlePhoneBlur = useCallback(
        (event) => {
            if (!event.target.value) {
                setInputsState({
                    ...inputsState,
                    class: styles.error,
                });
            }
        },
        [inputsState]
    );

    return (
        <div
            className={[
                className,
                inputsState.class,
                styles.inputContainer,
            ].join(" ")}
        >
            <input
                className={styles.input}
                id={options.id}
                name={options.name}
                type={options.type}
                placeholder=" "
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
            />
            <label className={styles.label} htmlFor={options.id}>
                {options.label}
            </label>
        </div>
    );
}
