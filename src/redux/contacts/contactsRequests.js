import axios from 'axios';
import {
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
  addContactStart,
  addContactSuccess,
  addContactFailure,
} from './slice';

export const fetchContacts = () => async (dispatch) => {
  try {
    dispatch(fetchContactsStart());
    const response = await axios.get('https://64b0f877062767bc48256aba.mockapi.io/contacts');
    const data = response.data;
    const contacts = data.map(({ id, name, phone }) => ({
      id,
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
