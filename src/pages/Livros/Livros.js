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

    fetch('http://localhost:5000/listagemLivros', {
      method: 'GET',
      mode: 'cors',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*',
      },
    })
    .then((resp) => resp.json())
    .then((data)=>{setBooks(data.data); 
      console.log(data.data)})
    .catch((err) =>{console.log(err)});

  }, []) ;

  // Função de exlusão de livro
  function removeBooks(id){

    fetch(`http://localhost:5000/excluirLivro/${id}`,{
      method: 'DELETE',
      mode: 'cors',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*',
      },
    })
    .then(resp => resp.json())
    .then(
      (data) =>{
        setBooks(books.filter((book_data) => book_data.cod_livro != id ))
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
                id={book.cod_livro}
                livro={book.nome_livro}
                autor={book.autor_livro}
                // categoria={book.category.category}
                key={book.cod_livro}
                handlerRemove={removeBooks}
                />
                
            ))
        }


          
        {/* </Container> */}

    </section>
  )
}
