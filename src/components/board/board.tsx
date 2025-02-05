import styles from "./board.module.css";
import BoardHeader from "./board-header";
import BoardFooter from "./board-footer";
import BoardMessage from "./board-message";
import { useEffect } from "react";
import { fetchGetMessage } from "../../store/message/thunks";
import { useAppDispatch } from "../../hooks/store";
type TBoardProps = {
    className?: string;
};

export default function Board({ className }: TBoardProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getMessages = async () => {
            let message;
            while ((message = await dispatch(fetchGetMessage()).unwrap())) {}
        };
        const timeoutId = setInterval(() => {
            getMessages();
        }, 10000);

        return () => {
            clearInterval(timeoutId);
        };
    }, []);

    return (
        <section className={[styles.section, className].join("  ")}>
            <BoardHeader />
            <BoardMessage />
            <BoardFooter />
        </section>
    );
}
