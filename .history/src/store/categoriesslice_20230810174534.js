import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDocument, getAllDocuments } from "../firebase";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { cateList: [] },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.cateList = action.payload;
      })
      .addCase(addCategory.fulfilled, (state,action) => {
        
      }),
});
export const fetchCategories = createAsyncThunk("categories/fetchData", async () => {
  const data = await getAllDocuments("categories");
  return data;
});
export const addCategory = createAsyncThunk("categories/add", async (data) => {
  await addDocument("categories", data);
  return data;
});
export default categoriesSlice;
