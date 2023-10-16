import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategories: 0,
  sort:{
    name:'популярности ↓',
    sort:'raiting&order=desc',
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategories: (state,action) => {
      state.activeCategories = action.payload
    },
    setActiveSort: (state,action) => {
      state.sort = action.payload
    },
    setFilters: (state, action) => {
      state.activeCategories = Number(action.payload.category)
      state.sort = action.payload.sort
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActiveCategories , setActiveSort, setFilters} = filterSlice.actions

export default filterSlice.reducer