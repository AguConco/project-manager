import { openFormNewProject } from '../../data/functions'
import './Header.css'

export const Header = () => {
    return (
        <header className="header-app">
            <button id="unite-project"> Unirse </button>
            <button id="new-project" onClick={openFormNewProject}> Nuevo proyecto </button>
        </header>
    )
}