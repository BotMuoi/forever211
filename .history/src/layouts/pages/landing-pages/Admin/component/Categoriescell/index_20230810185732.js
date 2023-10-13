import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteCategories } from "store/categoriesslice";
function CategoryCell({ value }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useS
  const id = value;
  const handleRemove = async () => {
    const removeConfirm = confirm("Có chắc muốn xóa");
    if (removeConfirm) {
      await dispatch(deleteCategories(value));
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
CategoryCell.propTypes = {
  value: PropTypes.string.isRequired,
};
export default CategoryCell;
