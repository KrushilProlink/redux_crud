import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    "id": "1",
    "userName": "john_doe",
    "email": "john.doe@example.com",
    "role": "user"
  },
  {
    "id": "2",
    "userName": "jane_smith",
    "email": "jane.smith@example.com",
    "role": "admin"
  },
  {
    "id": "3",
    "userName": "bob_jackson",
    "email": "bob.jackson@example.com",
    "role": "user"
  },
  {
    "id": "4",
    "userName": "alice_jones",
    "email": "alice.jones@example.com",
    "role": "user"
  },
  {
    "id": "5",
    "userName": "david_miller",
    "email": "david.miller@example.com",
    "role": "admin"
  },
  {
    "id": "6",
    "userName": "emily_carter",
    "email": "emily.carter@example.com",
    "role": "user"
  },
  {
    "id": "7",
    "userName": "george_harris",
    "email": "george.harris@example.com",
    "role": "user"
  },
  {
    "id": "8",
    "userName": "olivia_baker",
    "email": "olivia.baker@example.com",
    "role": "editor"
  },
  {
    "id": "9",
    "userName": "samuel_clark",
    "email": "samuel.clark@example.com",
    "role": "admin"
  },
  {
    "id": "10",
    "userName": "victoria_smith",
    "email": "victoria.smith@example.com",
    "role": "user"
  },
  {
    "id": "11",
    "userName": "zoe_campbell",
    "email": "zoe.campbell@example.com",
    "role": "admin"
  },
  {
    "id": "12",
    "userName": "john_doe",
    "email": "john.doe@example.com",
    "role": "user"
  },
  {
    "id": "13",
    "userName": "jane_smith",
    "email": "jane.smith@example.com",
    "role": "admin"
  },
  {
    "id": "14",
    "userName": "bob_jackson",
    "email": "bob.jackson@example.com",
    "role": "user"
  },
  {
    "id": "15",
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
