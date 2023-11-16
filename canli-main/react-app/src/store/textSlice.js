import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTextsAsync = createAsyncThunk(
  "textSlice/getTextsAsync",
  async ({ quantity, htmlstatus }) => {
    const res = await fetch(
      `https://baconipsum.com/api/?type=all-meat&paras=${quantity}&format=${htmlstatus}`
    ).then((data) => data.text());
    return res;
  }
);


// const initialState = {
//   quantity: 4,
//   htmlstatus: 'text',
//   text: "",
//   isLoading: false,
//   error: null,
// };

const textSlice = createSlice({
  name: 'textSlice',
  initialState: {
    quantity: 4,
    htmlstatus: 'text',
    text: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    changeQuantity: (state, action) => {
      state.quantity = action.payload;
      console.log(state.quantity)
    },
    changeHtmlstatus: (state, action) => {
      state.htmlstatus = action.payload;
      console.log(state.htmlstatus)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTextsAsync.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getTextsAsync.fulfilled, (state, action) => {
      state.text = action.payload;
      console.log(state.text)
      state.isLoading = false;
    }),
    builder.addCase(getTextsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
  }
},
);

export const { changeQuantity, changeHtmlstatus } = textSlice.actions;
export default textSlice.reducer;
