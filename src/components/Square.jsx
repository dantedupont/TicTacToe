
const Square = (props) => {
    const { squareClick, value, className } = props

    return (
        <>
            <button
                className={className}
                onClick={squareClick}
            >
                {value}
            </button>
        </>
    )
}

export default Square