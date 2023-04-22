import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  randomUsers: [],
  savedUsers: [],
  selectedUser: null,
  dialog: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    getRandomUsersSuccess(state, action) {
      state.isLoading = false;
      state.randomUsers = action.payload;
    },
    getSavedUsersSuccess(state, action) {
      state.isLoading = false;
      state.savedUsers = action.payload;
    },
    onSelectUser(state, action) {
      state.dialog = true;
      state.selectedUser = action.payload;
    },
    onCloseDialog(state) {
      state.dialog = false;
    },
    updateRandomUser(state, action) {
      const index = state.randomUsers.findIndex(
        (u) => u.id.value == state.selectedUser.id.value
      );
      const name = action.payload.split(" ");
      const title = name[0];
      const first = name[1];
      const last = name[2];
      state.randomUsers[index].name.title = title;
      state.randomUsers[index].name.first = first;
      state.randomUsers[index].name.last = last;
      state.dialog = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  getRandomUsersSuccess,
  getSavedUsersSuccess,
  onSelectUser,
  onCloseDialog,
  updateRandomUser,
} = slice.actions;

// ----------------------------------------------------------------------

export const isSaved = () => (dispatch, getState) => {
  const selectedUser = getState().user.selectedUser;
  const savedUsers = getState().user.savedUsers;
  const id =
    (selectedUser && selectedUser._id) ||
    (selectedUser && selectedUser.id && selectedUser.id.value);
  if (!id) {
    return false;
  }
  const index = savedUsers.findIndex((u) => u._id == id);
  if (index != -1) {
    return true;
  }
  return false;
};

export const updateUser = (name) => (dispatch, getState) => {
  if (dispatch(isSaved())) {
    const splittedName = name.split(" ");
    const title = splittedName[0];
    const first = splittedName[1];
    const last = splittedName[2];
    const newName = { title, first, last };
    const selectedUser = { ...getState().user.selectedUser, name: newName };
    dispatch(upsertUser(selectedUser));
  } else {
    dispatch(updateRandomUser(name));
  }
};

export const fetchRandomUsers = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get("https://randomuser.me/api?results=10");
    dispatch(getRandomUsersSuccess(response.data.results));
  } catch (error) {}
};

export const fetchSavedUsers = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get("http://localhost:8000/user");
    dispatch(getSavedUsersSuccess(response.data));
  } catch (error) {}
};

export const upsertUser = (user) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8000/user", user);
    dispatch(onCloseDialog());
    dispatch(fetchSavedUsers());
  } catch (err) {}
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/user/${id}`);
    dispatch(onCloseDialog());
    dispatch(fetchSavedUsers());
  } catch (err) {}
};
