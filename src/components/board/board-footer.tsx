import styles from './board-footer.module.css'
import { useCallback,  FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSendMessage } from '../../store/message/slice';
import Textarea from '../input/textarea';



export default function BoardFooter() {
    const dispatch = useDispatch()


    const handleEnterPress = useCallback((event: KeyboardEvent) => {
        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            (event.target?.form as HTMLFormElement).requestSubmit()
          }
    }, [])

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // if(!event?.target) return 

        const formData = new FormData(event.target as HTMLFormElement)

        const message = formData.get('sendingMessage')
        if(!message?.length) return

        dispatch(fetchSendMessage(message))

        event.currentTarget.reset()

    }, [])

    return (
        <footer className={styles.footer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Textarea className={styles.textarea}  name="sendingMessage" onKeyDown={handleEnterPress} />
            </form>
        </footer>
    )
}