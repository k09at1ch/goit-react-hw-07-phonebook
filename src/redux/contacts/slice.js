import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContactStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addContactSuccess(state, action) {
      state.isLoading = false;
      state.items.push(action.payload);
    },
    addContactFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteContact(state, action) {
      state.items = state.items.filter(({ id }) => id !== action.payload.id);
    },
    fetchContactsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchContactsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchContactsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addContactStart,
  addContactSuccess,
  addContactFailure,
  deleteContact,
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
} = contactsSlice.actions;

export const fetchContacts = () => async (dispatch) => {
  try {
    dispatch(fetchContactsStart());
    const response = await axios.get('https://64b0f877062767bc48256aba.mockapi.io/contacts');
    const data = response.data;
    const contacts = data.map(({ name, phone }) => ({
      id: name,
      name,
      phone,
    }));

    dispatch(fetchContactsSuccess(contacts));
  } catch (error) {
    dispatch(fetchContactsFailure(error.message));
  }
};

export const addContact = (contact) => async (dispatch) => {
  try {
    dispatch(addContactStart());
    const response = await axios.post('https://64b0f877062767bc48256aba.mockapi.io/contacts', contact);
    const newContact = response.data;

    dispatch(addContactSuccess(newContact));
  } catch (error) {
    dispatch(addContactFailure(error.message));
  }
};

export default contactsSlice.reducer;