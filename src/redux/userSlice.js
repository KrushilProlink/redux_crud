import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, userName, email, role } = action.payload;
      const editedUser = state.find((user) => user.id === id);
      if (editedUser) {
        editedUser.userName = userName;
        editedUser.email = email;
        editedUser.role = role;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
