import styles from "./board-header.module.css";
import { useSelector } from "react-redux";
import * as messageSelector from "../../store/message/selectors";

// type TBoardHeaderProps = {
//     className?: string
// }

export default function BoardHeader() {
    const { phone } = useSelector(messageSelector.userData);

    return <header className={styles.header}>{phone}</header>;
}
