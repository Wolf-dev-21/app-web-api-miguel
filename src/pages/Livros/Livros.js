import { useLocation } from 'react-router-dom'
import Message from '../../components/message/Message'
import styles from './Livro.module.css'

export default function Livros() {

  const location = useLocation();
  let message='';

  console.log('Location state: ' + location.state);

  if (location.state) {
      message=location.state;
  }

  return (
    <section className={styles.livros_container}>

      <h1>Aqui vai ser listado seus livros</h1>

        {
          message && <Message
                        msg={message}
                        type='success'
                      />
        }

        

    </section>
  )
}
