import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../components/message/Message';
import Container from '../../components/Container/Container';
import CardBook from '../../components/cardBook/CardBook';


import styles from './Livro.module.css';

export default function Livros() {

  const [books, setBooks] = useState([]);

  // Estado de dados da mensagem de exclusão de livros
  const [bookMessage, setBookMessage] = useState('');


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

  // Função de exlusão de livro
  function removeBooks(id){

    fetch(`http://localhost:5000/books/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then(resp => resp.json())
    .then(
      (data) =>{
        setBooks(books.filter((book_data) => book_data.id != id ))
        //alert('Livro ecluído!')
        setBookMessage('Livro exluído com sucesso!')
      }
    )
    .catch(err => console.log(err));
  }

  const location = useLocation();
  let message='';

  

  if (location.state) { 
      console.log('Location state: ' + location.state);
      message=location.state;
  }

  return (
    <section className={styles.livros_container}>

      <h1>Aqui vai ser listado seus livros</h1>

          {/* Sucesso em cadastro */}
        {
          message && <Message
                        msg={message}
                        type='success'
                      />
        }


          {/* Sucesso em delete  */}
        {
          bookMessage && <Message
                        msg={bookMessage}
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
                categoria={book.category.category}
                key={book.id}
                handlerRemove={removeBooks}
                />
                
            ))
        }


          
        {/* </Container> */}

    </section>
  )
}
