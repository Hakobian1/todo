import { combineReducers, configureStore } from '@reduxjs/toolkit'
import commonSlice from './commonSlice'
import todoSlice from './todoSlice'

const rootReducer = combineReducers({
  common: commonSlice,
  todo: todoSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})
