import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
    return (
        <header className="header-app">
            <Link to={'/project/join-project'} id="join-project"> Unirse </Link>
            <Link to={'/project/new-project'} id="new-project"> Nuevo proyecto </Link>
        </header>
    )
}