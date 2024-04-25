import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../components/message/Message';
import Container from '../../components/Container/Container';
import CardBook from '../../components/cardBook/CardBook';


import styles from './Livro.module.css';

export default function Livros() {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5000/books', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data)=>{setBooks(data); console.log(data)})
    .catch((err) =>{console.log(err)});

  }, []) ;

  const location = useLocation();
  let message='';

  

  if (location.state) { 
      console.log('Location state: ' + location.state);
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

        {/* <Container> */}

        {
          // books.length > 0 ? books.map((e)=>console.log(e)) : <></>
        }

        {
            books.map((book) =>(
              <CardBook
                id={book.id}
                livro={book.nome_livro}
                autor={book.nome_autor}
                categoria={book.category.category}/>
            ))
        }


          
        {/* </Container> */}

    </section>
  )
}
