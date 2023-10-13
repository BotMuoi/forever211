import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDocuments } from "../firebase";
import { removeDocumentById } from "../firebase";

const productSlice = createSlice({
  name: "product",
  initialState: { proList: [] },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.proList = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.proList = state.proList.filter((product) => product.id !== action.payload);
      }),
});
export const fetchProduct = createAsyncThunk("product/fetchData", async () => {
  const data = await getAllDocuments("places");
  return data;
});
export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  await removeDocumentById("places", id);
  return id;
});
export default productSlice;
