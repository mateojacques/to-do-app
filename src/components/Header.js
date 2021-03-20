import Add from './Add.js'
import {Link} from 'react-router-dom'

const Header = ({onAdd, showForm, showAltForm}) => {
    return (
        <header id="header">
            <Link to="/" className="title">To-do App</Link>
            <Add color={showForm || showAltForm ? "#D63230" : '#1C77C3'} value={showForm || showAltForm ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>} onClick={onAdd}/>
        </header>
    )
}

export default Header
