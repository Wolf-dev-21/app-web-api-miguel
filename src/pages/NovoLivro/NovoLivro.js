import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input'
import { Select } from '../Select/Select';

import styles from './NovoLivro.module.css'


export default function NovoLivro() {

  /* Objeto de navegação*/
  const navigate = useNavigate();

    /* State de dados das categorias vindas do aqruivo db,json */
  const[categories, setCategories] = useState([]);

  /* State de dados que vai armazenar o objeto json de livro*/
  const[book, setBook] = useState({});

   /* Recupera os dados de categoria do arquivo db,json */
  useEffect( ()=>{ 
  fetch(
      'http://localhost:5000/categories',
      {
        method:'get',
        headers:{
          'content-type':'application/json'
        }
      }).then(
        (resp) =>resp.json()
      ).then(
          (data)=>{
            setCategories(data);
            console.log(data);
          }
      ).catch(
        (error)=>{
          console.log(error);
        }
      )
}, [])

  /* Handler de captura dos dados de input (nomde do livro, autor, descrição) */
  function handlerOnChangeBook(event) {

    setBook({...book, [event.target.name] : event.target.value});
    console.log(book)
  }

  /* Handler de captura dos dados de Select (id e categoria) */
  function handlerChangeCategory(event) {
    setBook({...book, category:{
      id: event.target.value,
      category: event.target.options[event.target.selectedIndex].text
      
    }});
  }

   /* inserção dos dados de livro */
  function createBook(book){
    fetch('http://localhost:5000/books',{
      method:'post',
      headers:{
        'content-type':'application/json'
    },
    body: JSON.stringify(book)
  })
    .then(
      (resp) => resp.json()
    )
    .then(
      (data) => {
        console.log(data)
        navigate('/livros',{state:'Livro cadastrado com sucesso!'})
      }
    )
    .catch(
      (err)=>{console.log(err)}
    )

  }

   /* Função de submit */
  function submit(event){
    event.preventDefault();
    createBook(book);
  }


  return (
    <section className={styles.novolivros_container}>
      <h1>Cadastre livro</h1>

      <form onSubmit={submit}>
      
        {/*<p>
          <input type="text" placeholder="Nome do livro" id="" />
        </p>} */}
        <Input
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Digite o titulo do livro"
          text="Digite o titulo do livro"
          handlerOnChange={handlerOnChangeBook}
        />


        {/* <p>
          <input type="text" placeholder="Nome do autor" id="" />
        </p> */}
        <Input
          type="text"
          name="nome_autor"
          id="nome_autor"
          placeholder="Digite o nome do autor"
          text="Digite o nome do autor"
          handlerOnChange={handlerOnChangeBook}
        />


        {/* <p>
          <input type="text" placeholder="Descriçao do livro" id="" />
        </p> */}
        <Input
          type="text"
          name="descricao_livro"
          id="descricao_livro"
          placeholder="Digite a descricao do livro"
          text="digite a descricao do livro"
          handlerOnChange={handlerOnChangeBook}
        />

        <Select
            name="categoria_id"
            text="Selecione a categoria do livro"
            options={categories}
            handlerOnChange={handlerChangeCategory}
        />

        <p>
          <button type="submit">Enviar</button>
        </p> 

      </form>
    </section>
  )
}
