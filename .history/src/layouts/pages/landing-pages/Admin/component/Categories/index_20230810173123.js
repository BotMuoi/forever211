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
const Categories = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
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
  const onGridReady = useCallback(() => {
    setRowData(cateList);
  }, [cateList]);
  const columnDefs = [{ field: "id" }, { field: "name" }];
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
          <Button variant="contained">Thêm</Button>
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

export default Categories;
