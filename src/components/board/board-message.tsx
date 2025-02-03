import styles from './board-message.module.css'
import * as messageSelector from '../../store/message/selectors'
import { useSelector } from 'react-redux';

type TBoardProps = {
    className?: string
}

export default function BoardMessage({className}: TBoardProps) {
    const messages = useSelector(messageSelector.messages)
    return (
        <div className={[styles.message, className].join('  ')}>
            {
                messages.map((message, index) => (
                    <p key={index} className={[styles.messageItem, styles[message.type]].join(' ')}>{message.value}</p>
                ))
            }
        </div>
    )
}