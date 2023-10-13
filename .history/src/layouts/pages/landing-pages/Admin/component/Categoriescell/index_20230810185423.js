import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteProduct } from "store/productslice";
function CategoryCell({ value }) {
  const dispatch = useDispatch();
  const id = value;
  const handleRemove = async () => {
    const removeConfirm = confirm("Có chắc muốn xóa");
    if (removeConfirm) {
      await dispatch(deleteProduct(value));
    }
  };
  const handeEdit = () => {
    console.log(id);
  };
  return (
    <div>
      <i onClick={handeEdit} className="fa fa-edit"></i>

      <i onClick={handleRemove} className="fa fa-trash text-red-700"></i>
    </div>
  );
}
ProFunctionsCell.propTypes = {
  value: PropTypes.string.isRequired,
};
export default CategoryCell;
