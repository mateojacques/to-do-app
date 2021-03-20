import { Link } from "react-router-dom";

const Folder = ({ folder, onDelete, onEdit}) => {
  return (
    <div className="folder">
      <Link to={`/${folder.title}`} className="folder-title">
        {folder.title}
      </Link>
      <div className="folder-options">
        <button className="edit-btn" onClick={() => onEdit(folder.id)}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="remove-btn" onClick={() => onDelete(folder.id)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Folder;
