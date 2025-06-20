import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      state.user = { ...actions.payload };
    },
    removeUser : (state) =>{
        state.user = {}
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser , removeUser } = userSlice.actions ;

export default userSlice.reducer // EXPORT Slice reducer