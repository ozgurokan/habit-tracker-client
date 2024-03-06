import {createSlice} from "@reduxjs/toolkit";
import {deleteToken, setAccessToken} from "./helper"

const authSlice = createSlice(
    {
        name: "auth",
        initialState: {
            userData : {},
            isLoggedIn : false,
        },
        reducers:{
            storeLogin : (state,action) => {
                state.userData = action.payload;
                state.isLoggedIn = true;
                setAccessToken(action.payload.token);
            },
            storeLogOut : (state) => {
                state.userData =null;
                deleteToken();
                state.isLoggedIn = false;
            }
        }
    }
)

export const {storeLogin,storeLogOut} = authSlice.actions;
export default authSlice.reducer;