import styles from './App.module.css';
import Form from './components/form/form';
import Board from './components/board/board'
import { useSelector } from 'react-redux';
import * as messageSelector from './store/message/selectors'

function App() {
  const { idInstance, apiTokenInstance, phone } = useSelector(messageSelector.userData)

  return (
    <div>
      {!!idInstance && !!apiTokenInstance && !!phone ? (
        <Board />
      ) : (
        <div className="page">
          <Form className={styles.form} />
        </div>
      )}
    </div>
  )
}

export default App
