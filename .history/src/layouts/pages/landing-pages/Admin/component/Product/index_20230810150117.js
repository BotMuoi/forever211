import React from "react";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { fetchProduct } from "store/productslice";
import { productSelector } from "store/selector";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import ProFunctionsCell from "../Productfunctioncell";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Product = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  console.log(rowData);
  const proList = useSelector(productSelector);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchProduct());
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
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="decription"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="price"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="rating"
                type="text"
                fullWidth
                variant="standard"
              />
              <div>
              <label htmlFor="">Discount</label>

              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
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
