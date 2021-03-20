import Folder from "./Folder"


const Folders = ({folders, onDelete, onEdit}) => {
  return (
    <section id="folders">
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} onDelete={onDelete} onEdit={onEdit}/>
      ))}
    </section>
  );
};

export default Folders;
