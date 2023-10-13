import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategories } from "store/categoriesslice";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
function CategoryCell({ value }) {
  const dispatch = useDispatch();
  const cateList = useSelector(cate)
  const [open, setOpen] = useState(false);
  const [cateData, setCateData] = useState({
    id: "",
    name: "",
  });
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
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <i onClick={handeEdit} className="fa fa-edit"></i>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm danh mục</DialogTitle>
        <DialogContent>
          <DialogContentText>Quản lý danh mục</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            placeholder="Auto generate id"
            type="text"
            fullWidth
            variant="standard"
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            name="name"
            value={cateData.name}
            onChange={(e) => handleChangeAdd(e.target)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmitAdd();
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
      <i onClick={handleRemove} className="fa fa-trash text-red-700"></i>
    </div>
  );
}
CategoryCell.propTypes = {
  value: PropTypes.string.isRequired,
};
export default CategoryCell;
