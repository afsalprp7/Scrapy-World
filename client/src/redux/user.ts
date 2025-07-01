import { createSlice } from "@reduxjs/toolkit";
import { userDetails } from "@/tpes/home";


interface UserState {
  user: userDetails | null;
  userLoggedIn: boolean;
}
const initialState :UserState = {
  user : null,
  userLoggedIn : false

}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      state.user = { ...actions.payload };
      state.userLoggedIn = true ;
    },
    removeUser : (state) =>{
        state.user = null;
        state.userLoggedIn = false
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser , removeUser } = userSlice.actions ;

export default userSlice.reducer // EXPORT Slice reducer