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
import { categoriesSelector } from "store/selector";
import { useEffect } from "react";
import { editCategories } from "store/categoriesslice";
function CategoryCell({ value }) {
  const dispatch = useDispatch();
  const cateList = useSelector(categoriesSelector);
  const [open, setOpen] = useState(false);
  const [cateData, setCateData] = useState({
    id: "",
    name: "",
  });
  useEffect(() => {
    const cate = cateList.find((cate) => cate.id === value);
    setCateData(cate);
  }, []);
  const handleChange = (target) => {
    setCateData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };
  const handleSubmitEdit = () => {
    try {
      dispatch(editCategories({ id: cateData.id, data: cateData }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = async () => {
    const removeConfirm = confirm("Có chắc muốn xóa");
    if (removeConfirm) {
      await dispatch(deleteCategories(value));
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <i onClick={() => setOpen(true)} className="fa fa-edit"></i>
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
            onChange={(e) => handleChange(e.target)}
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
              handleSubmitEdit();
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
