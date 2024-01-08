import { MdRemoveCircleOutline } from "react-icons/md";
import "./CateListItem.scss";

const CateListItem = ({ todo, onRemove }) => {
  const { categoryId, categoryName } = todo;
  return (
    <div className="CateListItem">
      <div className="text">{categoryName}</div>
      <div className="remove" onClick={() => onRemove(categoryId)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default CateListItem;
