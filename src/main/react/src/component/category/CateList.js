import CateListItem from "./CateListItem";
import "./CateList.scss";

const CateList = ({ todos, onRemove }) => {
  return (
    <div className="CateList">
      {todos.map((todo) => (
        <CateListItem todo={todo} key={todo.id} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default CateList;
