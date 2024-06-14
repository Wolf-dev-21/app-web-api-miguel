import styles from './EditarLivro.module.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input'
import { Select } from '../Select/Select';

function EditarLivro(){

     /* State de dados das categorias vindas do aqruivo db,json */
    const[categories, setCategories] = useState([]);

    // Recuperando o id da url
    const {id} = useParams();
    console.log('ID:' + id);

    //Objeto de navegação
    const navigate = useNavigate();

    const [book, setBook] = useState({});

     /* Recupera os dados de categoria do arquivo db,json */
//     useEffect( ()=>{ 
//     fetch(
//         'http://localhost:5000/categories',
//         {
//             method:'get',
//             headers:{
//             'content-type':'application/json'
//             }
//         }).then(
//         (resp) =>resp.json()
//         ).then(
//             (data)=>{
//             setCategories(data);
//             console.log(data);
//             }
//         ).catch(
//         (error)=>{
//             console.log(error);
//         }
//         )
// }, [])




    // Recuperando os dados de livro para edição
    useEffect(() => {

        fetch(`http://localhost:5000/listagemLivro/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*',
        },
    })
        .then((resp) => resp.json())
        .then((data)=>{setBook(data.data); console.log(data.data)})
        .catch((err) =>{console.log(err)});
    
    }, []) ;


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

//Função de submit controlado dos dados
function submit(event){
    event.preventDefault();
    editBook(book);
}

//Funcionalidade de edição de livro
function editBook(book){

    fetch(`http://localhost:5000/alterarLivro`, {
        method: 'PUT',
        mode: 'cors',
        headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*',
        },
        body: JSON.stringify(book)
    })
    .then(resp => resp.json())
    .then((data)=>{
        setBook(data);
        navigate('/Livros',{state:'Livro alterado com sucesso!'});
    })
    .catch((error) => console.log(error));
}

    return(

    <div className={styles.book_container}> 
        <h1>Edição de Livro</h1>

        <form onSubmit={submit}>

        <Input
            type="text"
            name="nome_livro"
            id="nome_livro"
            placeholder="Digite o titulo do livro"
            text="Digite o titulo do livro"
            value={book.nome_livro}
            handlerOnChange={handlerOnChangeBook}
        />

        <Input
        type="text"
        name="autor_livro"
        id="autor_livro"
        placeholder="Digite o nome do autor"
        text="Digite o nome do autor"
        value={book.autor_livro}
        handlerOnChange={handlerOnChangeBook}
        />

        <Input
        type="text"
        name="descricao_livro"
        id="descricao_livro"
        placeholder="Digite a descricao do livro"
        text="digite a descricao do livro"
        value={book.descricao_livro}
        handlerOnChange={handlerOnChangeBook}
        />

        <Select
            name="categoria_id"
            text="Selecione a categoria do livro"
            options={categories}
            handlerOnChange={handlerChangeCategory}
        />

        <p>In<Input type='submit' value='Editar Livro' /></p>

        </form>

    </div>

    );
}

export default EditarLivro;