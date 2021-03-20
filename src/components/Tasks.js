import Task from "./Task"


const Tasks = ({tasks, onDelete, onToggle, onEdit}) => {

  return (
    <section id="tasks">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit}/>
      ))}
    </section>
  );
};

export default Tasks;
