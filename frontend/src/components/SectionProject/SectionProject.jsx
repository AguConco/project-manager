import { Link, useParams } from 'react-router-dom'
import './SectionProject.css'
import { NavBar } from '../NavBar/NavBar'
import { SectionProjectEmpty } from '../SectionProjectEmpty/SectionProjectEmpty'

export const SectionProject = () => {

    const { id } = useParams()

    return (
        <>
            <NavBar />
            {id !== 'empty'
                ? <section>
                    <header className="header-project">
                        <h1 className="name-project">Nombre del proyecto <button>Invitar</button></h1>
                        <div className="progress-project">
                            <div className='progress-completed'></div>
                            <div className='progress-total'></div>
                            <span>50%</span>
                        </div>
                    </header>
                    <nav className='nav-project'>
                        <ul>
                            <li><Link className='nav-project-selected'><i className="fa-solid fa-bars-progress"></i> Etapas</Link></li>
                            <li><Link><i className="fa-solid fa-users"></i> Miembros</Link></li>
                            <li><Link><i className="fa-solid fa-gears"></i> Configuración</Link></li>
                        </ul>
                    </nav>
                    <div className='stages'>
                        <Link to={'/'} target='_blank'>Crear nueva etapa</Link>
                    </div>
                </section>
                : <SectionProjectEmpty />
            }
        </>
    )
}
