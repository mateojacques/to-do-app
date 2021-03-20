const Add = ({color, value, onClick}) => {
    return <button style={{color: color}} onClick={onClick} tabIndex="-1" id="add-btn">{value}</button>
}

export default Add
