import {useState} from 'react'

const Form = ({onAdd}) => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [completed, setCompleted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title || !date){
            alert('Please complete the fields')
            return
        }

        onAdd({title, date, completed})

        setTitle('')
        setDate('')
        setCompleted(false)
    }

    return (
            <form id="form" onSubmit={onSubmit}>
                <div>
                <div className="form-control">
                    <label>Task</label>
                    <input type="text" placeholder="Task name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                </div>

                <input type="submit" value="Add task" className="submit"/>
            </form>
    )
}

export default Form
