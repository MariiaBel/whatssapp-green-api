import styles from "./board-footer.module.css";
import { useCallback, FormEvent, KeyboardEventHandler } from "react";
import Textarea from "../input/textarea";
import { fetchSendMessage } from "../../store/message/thunks";
import { useAppDispatch } from "../../hooks/store";

export default function BoardFooter() {
    const dispatch = useAppDispatch();

    const handleEnterPress: KeyboardEventHandler<HTMLTextAreaElement> =
        useCallback((event) => {
            if (event.keyCode == 13 && event.shiftKey == false) {
                event.preventDefault();
                (event.target as HTMLTextAreaElement).form?.requestSubmit();
            }
        }, []);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const message = (formData.get("sendingMessage") || "") as string;
        if (!message?.length) return;

        dispatch(fetchSendMessage(message));

        event.currentTarget.reset();
    }, []);

    return (
        <footer className={styles.footer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Textarea
                    className={styles.textarea}
                    name="sendingMessage"
                    onKeyDown={handleEnterPress}
                />
            </form>
        </footer>
    );
}
