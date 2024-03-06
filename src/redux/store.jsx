import {configureStore,combineReducers} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist : ["cars"]
}

const reduc = combineReducers({
    auth : authReducer,

})

const persistedReducer =  persistReducer(persistConfig,reduc)

export const store = configureStore({
        reducer:persistedReducer,
        middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(store);