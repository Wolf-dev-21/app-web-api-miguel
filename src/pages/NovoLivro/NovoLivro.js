import { useState, useEffect } from 'react';

import Input from '../../components/Input/Input'
import Select from '../../components/form/Select'

import styles from './NovoLivro.module.css'

export default function NovoLivro() {

  const[categories, setCategories] = useState([]);

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

  return (
    <section className={styles.novolivros_container}>
      <h1>Cadastre livro</h1>

      <form>
      
        {/*<p>
          <input type="text" placeholder="Nome do livro" id="" />
        </p>} */}
        <Input
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Digite o titulo do livro"
          text="Digite o titulo do livro"
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
        />

        <Select
            name="categoria_id"
            text="Selecione a categoria do livro"
            options={categories}
        />

        <p>
          <button type="submit">Enviar</button>
        </p> 

      </form>
    </section>
  )
}
