import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDocuments } from "../firebase";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { cateList: [] },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.cateList = action.payload;
    }),
});
export const fetchCategories = createAsyncThunk("categories/fetchData", async () => {
  const data = await getAllDocuments("categories");
  return data;
});
export const addCCategory = createAsyncThunk('categories/add', async (data) => {
  await add
  return data
})
export default categoriesSlice;
