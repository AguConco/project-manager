import EmojiPicker, { EmojiStyle, SuggestionMode } from 'emoji-picker-react';
import { useContext, useEffect, useState } from 'react';
import { ProjectsContext } from '../../context/projectsContext';
import { generateId } from '../../data/functions'
import { Link } from 'react-router-dom';

export const FormNewProject = () => {

    const { createProject, setNameProject, setIdProject, setCodeProject } = useContext(ProjectsContext)
    const [openEmoji, setOpenEmoji] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)

    const maxLetterName = 50

    const handleEmojiClick = (emojiData, event) => {
        setName(prev => prev + emojiData.emoji)
        document.getElementById('name-project').focus()
        message !== null && setMessage(null)
    }

    const changeName = ({ target }) => {
        let name = target.value

        maxLetterName >= name.length && setName(name)
        message !== null && setMessage(null)
    }

    const submitFirstStage = (e) => {
        e.preventDefault()

        const date = new Date()

        const data = { name, id: generateId(), code: generateId(), date: date.getTime() }

        createProject(data)
            .then(e => e.json())
            .then(e => {

                if (e.status) {
                    if (e?.data) {
                        const { name, id, code } = e?.data
                        setNameProject(name)
                        setIdProject(id)
                        setCodeProject(code)
                    }

                } else {
                    setMessage({ text: e.message, status: e.status })
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        document.title = ''

        const handleKeyUp = (e) => {
            e.keyCode === 27 && setOpenEmoji(false)
        };

        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        };
    }, []);

    return (
        <section className='section-new-project'>
            <h1>Creando el proyecto <span>{name}</span></h1>
            <form onSubmit={submitFirstStage}>
                <div>
                    <div className='container-name-project'>
                        <input id='name-project' type="text" placeholder="Nombre" value={name} onChange={changeName} />
                        <span>{name.length}/50</span>
                        <div></div>
                        <button type="button" onClick={() => setOpenEmoji(prev => !prev)}>
                            {openEmoji
                                ? (
                                    <>
                                        <i className="fa-solid fa-times"></i>
                                        <pre>Cerrar [Esc]</pre>
                                    </>
                                )
                                : (
                                    <>
                                        <i className="fa-solid fa-face-grin-wide"></i>
                                        <pre>Emojins</pre>
                                    </>
                                )}
                        </button>
                    </div>
                    {message !== null && <span className={message.status ? 'message-success' : 'message-error'}>{message.text}</span>}
                </div>
                <div className='container-emojis'>
                    {openEmoji &&
                        <EmojiPicker
                            autoFocusSearch={false}
                            onEmojiClick={handleEmojiClick}
                            height={350}
                            width={"100%"}
                            suggestedEmojisMode={SuggestionMode.RECENT}
                            emojiStyle={EmojiStyle.NATIVE}
                            skinTonesDisabled />
                    }
                </div>
                <div className='container-btn'>
                    <Link to={'/project'} className='btn-cancel-project'>Cancelar
                    </Link>
                    <button type='submit' className='btn-first-stage'>Siguiente</button>
                </div>
            </form>
        </section>
    )
}