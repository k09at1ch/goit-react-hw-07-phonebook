import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {

    data: [
      { name: 'Potato', number: 678920, id: '1' },
      { name: 'Sasha', number: 987620, id: '2' },
      { name: 'Quiet kid', number: 54320, id: '3' },
      { name: 'Top G', number: 6543, id: '4' },
      { name: 'Computer service', number: 87654, id: '5' },
      { name: 'Bot', number: 2432, id: '6' },
    ],
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.data.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: String(Math.random()),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.data = state.data.filter(({ id }) => id !== action.payload.id);
    },
    // updateSearchTerm(state, action) {
    //   state.searchTerm = action.payload;
    // },
  },
});

export const { addContact, deleteContact, updateSearchTerm } = contactsSlice.actions;

export default contactsSlice.reducer;
