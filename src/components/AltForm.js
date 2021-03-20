import {useState} from 'react'

const AltForm = ({onAdd}) => {
    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title){
            alert('Please complete the fields')
            return
        }

        onAdd({title, tasks})

        setTitle('')
        setTasks([])
    }

    return (
            <form id="form" onSubmit={onSubmit}>
                <div>
                <div className="form-control">
                    <label>Folder</label>
                    <input type="text" placeholder="Folder name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                </div>

                <input type="submit" value="Add folder" className="submit"/>
            </form>
    )
}

export default AltForm
