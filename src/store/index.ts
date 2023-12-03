import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/Reservation";
import { TypedUseSelectorHook, useDispatch , useSelector as useReduxSelector } from "react-redux";

import {
  persistStore,
  persistReducer,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import logger from 'redux-logger';


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  'cart' : CartSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      (process.env.NODE_ENV ==='development' && typeof window !== "undefined")
        ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
        : getDefaultMiddleware({ serializableCheck: false }).concat(logger),
})
export let persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
