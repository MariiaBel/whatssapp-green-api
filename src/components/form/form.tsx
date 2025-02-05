import Button from "../button/button";
import { content } from "./constants";
import { FormEvent, useCallback } from "react";
import styles from "./form.module.css";
import { useState } from "react";
import Input from "../input/input";
import { setUserData } from "../../store/message/slice";
import { useAppDispatch } from "../../hooks/store";

const inputsRequired = ["idInstance", "apiTokenInstance", "phone"];

type TFormProps = {
    className: string;
};

type TInput = {
    id: string;
    label: string;
    name: string;
    type: string;
};
export default function Form({ className }: TFormProps) {
    const dispatch = useAppDispatch();

    const [inputsErrorState, setInputsErrorState] = useState({
        idInstance: false,
        apiTokenInstance: false,
        phone: false,
    });

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if(!event?.target) return

        const formData = new FormData(event.target as HTMLFormElement);

        let success = true;
        inputsRequired.forEach((inputName) => {
            if (!formData.get(inputName)) {
                success = false;
                setInputsErrorState((state) => {
                    return {
                        ...state,
                        [inputName]: true,
                    };
                });
            } else {
                setInputsErrorState((state) => {
                    return {
                        ...state,
                        [inputName]: false,
                    };
                });
            }
        });

        if (success) {
            dispatch(
                setUserData({
                    idInstance: (formData.get("idInstance") || "") as string,
                    apiTokenInstance: (formData.get("apiTokenInstance") ||
                        "") as string,
                    phone: (formData.get("phone") || "") as string,
                })
            );
        }
    }, []);

    return (
        <section className={[styles.section, className].join("  ")}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {content.inputs.map((input: TInput) => (
                    <Input
                        key={input.id}
                        isError={inputsErrorState.phone}
                        {...input}
                    />
                ))}
                <Button type="submit" className={styles.btn}>
                    {content.btn.toUpperCase()}
                </Button>
            </form>
        </section>
    );
}
