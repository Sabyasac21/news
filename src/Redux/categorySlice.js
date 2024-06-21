import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {category:'business', page:1, showBackDrop:false, articleTitle:''},
    reducers: {
        setCategory: (state, action)=> {state.category = action.payload},
        setPage: (state, action)=> {state.page = action.payload},
        setShowBackdrop: (state, action)=>{state.showBackDrop = action.payload},
        setArticleTitle: (state, action)=>{state.articleTitle = action.payload}

    }
})

export const { setCategory, setPage, setShowBackdrop, setArticleTitle } = categorySlice.actions;

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer
    }
})