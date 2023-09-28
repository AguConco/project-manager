import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
    return (
        <header className="header-app">
            <button id="unite-project"> Unirse </button>
            <Link to={'/project/new-project'} id="new-project"> Nuevo proyecto </Link>
        </header>
    )
}