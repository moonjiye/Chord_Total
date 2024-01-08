import "./CateTemplate.scss";

const CateTemplate = ({ children }) => {
  return (
    <div className="CateTemplate">
      <div className="app-title">카테고리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default CateTemplate;
