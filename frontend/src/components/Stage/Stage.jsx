import './Stage.css'

export const Stage = ({ data }) => {

    const {name, description, task_quantity} = data


    return (
        <div className='stage'>
            <h2>{name}</h2>
            <p>{description}</p>
            <span>{task_quantity}</span>
        </div>
    )
}