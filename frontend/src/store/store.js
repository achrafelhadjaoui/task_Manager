import { configureStore } from '@reduxjs/toolkit'
import {reducer as userReducer} from './userSlice'

export default configureStore({
  reducer: {
    user: userReducer
  },
})