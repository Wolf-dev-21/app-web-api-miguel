import styles from './CardBook.module.css'

function CardBook({id, livro, autor, categoria}) {

    return(
        <div className={styles.book_card}> 

            <h4>{livro}</h4>

            <p></p>{autor}

            <p className={styles.category_text}>
                <span></span>{categoria}
            </p>

        </div>
    )

}

export default CardBook;