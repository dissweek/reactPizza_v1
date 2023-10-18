import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 items: [],
 totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state,action) => {
      const checkPizza = state.items.find(obj => obj.id === action.payload.id && obj.types === action.payload.types && obj.sizes === action.payload.sizes)
      checkPizza ? checkPizza.count++ : state.items.push({...action.payload, count: 1,})
      state.totalPrice= state.items.reduce((sum, obj) =>{
        return (obj.price*obj.count) + sum;
      },0)
    },
    // addProduct: (state,action) => {
    //   state.items.push(action.payload)
    // },
    removeProduct: (state,action) => {
      state.items.filter(obj => obj.id !== action.payload)
    },
    clearCart: (state,action) => {
      state.items=[]
    },
    }
})

// Action creators are generated for each case reducer function
export const {addProduct,  removeProduct,  clearCart} = cartSlice.actions

export default cartSlice.reducer