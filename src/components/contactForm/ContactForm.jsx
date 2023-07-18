import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchContacts } from '../../redux/contacts/contactsRequests';
import { addContact } from '../../redux/contacts/contactsRequests';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleAddContact = async () => {
    if (!name || !number) {
      return;
    }

    const existingContact = contacts.find((contact) => contact.name === name);
    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    try {
      const response = await axios.get('https://64b0f877062767bc48256aba.mockapi.io/contacts');
      const contactsFromServer = response.data;
      const maxId = Math.max(...contactsFromServer.map((contact) => parseInt(contact.id)));

      const newContact = {
        id: String(maxId + 1),
        name,
        phone: number,
      };

      dispatch(addContact(newContact));

      setName('');
      setNumber('');

      await dispatch(fetchContacts());
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="text"
        value={number}
        onChange={handleNumberChange}
        placeholder="Number"
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
}

export default ContactForm;