import React from "react";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { fetchProduct } from "store/productslice";
import { productSelector } from "store/selector";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ProFunctionsCell from "../Productfunctioncell";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchCategories } from "store/categoriesslice";
import { categoriesSelector } from "store/selector";
import { v4 as uuidv4 } from "uuid";
// import { useFormik } from "formik";
const Product = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  console.log(rowData);
  const proList = useSelector(productSelector);
  const cateList = useSelector(categoriesSelector);
  const [open, setOpen] = useState(false);
  const [formAdd, setFormAdd] = useState( {
    id: uuidv4(),
    name: "",
    category_id: "",
    discount: {
      persent: 0,
      description: "",
    },
    img: "",
    price: 0,
    rating: 0,
    tags: [],
  })
  const formik = {
    values:,
    onSubmit: () => {
      console.log(formik.values);
    },
    handleChange: (target) => {
      formik.values[target.name] = target.value;
    },
  };
  const handleSubmit = () => {
    console.log(formAdd);
  }
  const handleChange = (value) => {
    
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchProduct());
      await dispatch(fetchCategories());
      setIsLoading(false);
    };
    loadData();
  }, []);
  const ImageCell = (params) => {
    return <img src={params.value} alt="" width={"50px"} />;
  };
  const onGridReady = useCallback(() => {
    const products = proList.map((pro) => {
      const temp = { ...pro };
      temp.tagsString = temp.tags.join(", ");
      console.log(temp);
      return temp;
    });
    setRowData(products);
  }, [proList]);
  const columnDefs = [
    { field: "id" },
    { field: "name" },
    { headerName: "tag", field: "tagsString" },
    { field: "price" },
    {
      headerName: "discount",
      children: [{ field: "discount.percent" }, { field: "discount.description" }],
    },
    { field: "rating" },
    { field: "img", cellRenderer: ImageCell },
    { field: "description" },
    {
      headerName: "Functions",
      field: "id",
      cellRenderer: ProFunctionsCell,
      filter: false,
      type: "alignCenterCell",
    },
  ];
  const defaultColDef = {
    resizable: true,
    filter: true,
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <NavBar />
          <Button variant="contained" onClick={handleClickOpen}>
            Thêm
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText>
              <form action="" onSubmit={formik.onSubmit}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.category_id}
                    label="Category"
                    name="category_id"
                    onChange={(e) => formik.handleChange(e.target)}
                  >
                    {cateList.map((cate) => (
                      <MenuItem key={cate.id} value={cate.id}>
                        {cate.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  value={formik.values.name}
                  onChange={(e) => formik.handleChange(e.target)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="decription"
                  type="text"
                  value={formik.values.description}
                  onChange={(e) => formik.handleChange(e.target)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="price"
                  type="number"
                  value={formik.values.price}
                  onChange={(e) => formik.handleChange(e.target)}
                  fullWidth
                  variant="standard"
                />
                <div>
                  <label htmlFor="">Discount</label>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="description"
                    type="text"
                    value={formik.values.description}
                    onChange={(e) => formik.handleChange(e.target)}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="percent"
                    type="number"
                    value={formik.values.percent}
                    onChange={(e) => formik.handleChange(e.target)}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Image"
                  type="file"
                  fullWidth
                  variant="standard"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={formik.onSubmit}>
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
          <div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              defaultColDef={defaultColDef}
            ></AgGridReact>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
