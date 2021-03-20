const Task = ({ task, onDelete, onToggle, onEdit}) => {
  return (
    <div
      className={`task ${task.completed ? "completed" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
      onTouchStart={() => onToggle(task.id)}
    >
      <div className="task-info">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.date}</p>
      </div>
      <div className="task-options">
      <button className="edit-btn" onClick={() => onEdit(task.id)}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="remove-btn" onClick={() => onDelete(task.id)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Task;
