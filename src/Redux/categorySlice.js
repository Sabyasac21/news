import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {category:'Breaking News', page:1, showBackDrop:false},
    reducers: {
        setCategory: (state, action)=> {state.category = action.payload},
        setPage: (state, action)=> {state.page = action.payload},
        setShowBackdrop: (state, action)=>{state.showBackDrop = action.payload}
    }
})

export const { setCategory, setPage, setShowBackdrop } = categorySlice.actions;

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer
    }
})