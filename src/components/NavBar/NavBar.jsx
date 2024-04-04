import { Link, Outlet } from 'react-router-dom'
import styles from './NavBar.module.css'

import Container from '../Container/Container'

export default function NavBar() {
    return(
        <div>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/livros'>Livros</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/novolivro'>CadastrarLivro</Link>
                    </li>
                    <li className={styles.item}>

                    </li>
                </ul>
            </Container>
            <Outlet/>
        </div>
    )
}