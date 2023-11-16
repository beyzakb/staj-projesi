import {configureStore} from '@reduxjs/toolkit'
import textSlice from '../store/textSlice'

export const store = configureStore({
    reducer:{
        textSlice:textSlice,
    },
})  