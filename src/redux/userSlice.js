import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    "id": "6b0355e1",
    "userName": "john_doe",
    "email": "john.doe@example.com",
    "role": "user"
  },
  {
    "id": "6b0375e1",
    "userName": "jane_smith",
    "email": "jane.smith@example.com",
    "role": "admin"
  },
  {
    "id": "6b0475e1",
    "userName": "bob_jackson",
    "email": "bob.jackson@example.com",
    "role": "user"
  },
  {
    "id": "6b0365e1",
    "userName": "alice_jones",
    "email": "alice.jones@example.com",
    "role": "user"
  },

];

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
