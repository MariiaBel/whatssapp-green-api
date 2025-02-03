import Button from "../button/button"
import { content } from "./constants"
import { FormEvent, useCallback } from 'react';
import styles from './form.module.css'
import { useState } from "react";
import Input from "../input/input";
import { useDispatch } from 'react-redux';
import { setUserData } from "../../store/message/slice";

const inputsRequired = ['idInstance', 'apiTokenInstance', 'phone']

type TFormProps = {
    className: string
}

type TInput = {
    id: string, 
    label: string,
    name: string,
    type: string
}
export default function Form({className}: TFormProps) {
    const dispatch = useDispatch()

    const [inputsErrorState, setInputsErrorState] = useState({
        idInstance: false,
        apiTokenInstance: false,
        phone: false
    })
    

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // if(!event?.target) return 

        const formData = new FormData(event.target as HTMLFormElement)

        let success = true
        inputsRequired.forEach(inputName => {
            if(!formData.get(inputName)) {
                success = false
                setInputsErrorState((state) => {
                    return { 
                        ...state,
                        [inputName]: true
                    }
                })
            }  else {
                setInputsErrorState((state) => {
                    return { 
                        ...state,
                        [inputName]: false
                    }
                })
            }
        })

  
        if(success) {
            dispatch(setUserData({
                idInstance: formData.get('idInstance'),
                apiTokenInstance: formData.get('apiTokenInstance'),
                phone: formData.get('phone')
            }))
        }

    }, [])

    return (
        <section className={[styles.section, className].join('  ')}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {content.inputs.map((input: TInput)=>(
                    <Input key={input.id} isError={inputsErrorState.phone} {...input} />
                ))}
                <Button type="submit" className={styles.btn}>
                    {content.btn.toUpperCase()}
                </Button>
            </form>
        </section>
    )
}