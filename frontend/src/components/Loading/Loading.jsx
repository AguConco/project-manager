import './Loading.css'

export const Loading = ({ height, width }) => {

    const h = height || 40
    const w = width || 40

    return (
        <div className='container-loading'>
            <div className='loading' style={{ height: h, width: w }}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}