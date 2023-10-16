import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    filter,
  },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())