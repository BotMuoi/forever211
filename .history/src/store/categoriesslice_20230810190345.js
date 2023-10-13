import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDocument, getAllDocuments, removeDocumentById } from "../firebase";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { cateList: [] },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.cateList = Object.values(action.payload);
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.cateList.push(action.payload);
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.cateList = state.cateList.filter((cate) => cate.id !== action.payload);
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
export const deleteCategories = createAsyncThunk("categories/delete", async (id) => {
  await removeDocumentById("categories", id);
  return id;
});
export const editCategories = createAsyncThunk("categories/delete", async ({ id, data }) => {
  await edit("categories", id, data);
  return id;
});
export default categoriesSlice;
