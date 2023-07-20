import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './contactsRequests';
import { addContact } from './contactsRequests';
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
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

export default contactsSlice.reducer;
