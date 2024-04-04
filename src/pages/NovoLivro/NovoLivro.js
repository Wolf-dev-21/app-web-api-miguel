import Input from '../../components/Input/Input'

import styles from './NovoLivro.module.css'

export default function NovoLivro() {
  return (
    <section className={styles.novolivros_container}>
      <h1>Cadastre livro</h1>

      <form>
        <Input
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Digite o titulo do livro"
          text="Digite o titulo do livro"
        />

        <Input
          type="text"
          name="nome_autor"
          id="nome_autor"
          placeholder="Digite o nome do autor"
          text="Digite o nome do autor"
        />

        <Input
          type="text"
          name="descricao_livro"
          id="descricao_livro"
          placeholder="Digite a descricao do livro"
          text="digite a descricao do livro"
        />

        {/* <p>
          <input type="text" placeholder="Nome do livro" id="" />
        </p>

        <p>
          <input type="text" placeholder="Nome do autor" id="" />
        </p>

        <p>
          <input type="text" placeholder="Descriçao do livro" id="" />
        </p>

        <p>
          <button type="submit">Enviar</button>
        </p> */}
      </form>
    </section>
  )
}
