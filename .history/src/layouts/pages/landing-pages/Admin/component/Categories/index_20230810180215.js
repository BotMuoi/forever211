import React from "react";
import NavBar from "../NavBar";
import { fetchCategories } from "store/categoriesslice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { categoriesSelector } from "store/selector";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import { addCategory } from "store/categoriesslice";
import { useRef } from "react";
const Categories = () => {
  const gridRef = useRef();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [cateData, setCateData] = useState({
    id: uuidv4(),
    name: "",
  });
  const handleSubmitAdd = () => {
    try {
      dispatch(addCategory(cateData));
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeAdd = (target) => {
    setCateData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };
  console.log(rowData);
  const cateList = useSelector(categoriesSelector);
  console.log(cateList);
  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchCategories());
      setIsLoading(false);
    };
    loadData();
  }, []);
  useEffect(() => {

  }, [cateList])
  const onGridReady = useCallback(
    (params) => {
      gridRef.current = params.api;
    },
    [cateList]
  );
  const columnDefs = [{ field: "id" }, { field: "name" }];
  const defaultColDef = {
    resizable: true,
    filter: true,
  };
  const refreshData = () => {
    console.log(gridRef);
    if (gridRef.current) {
      gridRef.current.refreshCells();
    }
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <NavBar />
          <Button variant="contained" onClick={handleClickOpen}>
            Thêm Danh Mục
          </Button>
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
          <div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              defaultColDef={defaultColDef}
              refreshCellsParams={{ force: true }}
            ></AgGridReact>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
