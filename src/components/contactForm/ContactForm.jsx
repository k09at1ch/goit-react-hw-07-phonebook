import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/slice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.data);
  const dispatch = useDispatch();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleAddContact = () => {
    if (!name || !number) {
      return;
    }

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number)); 
    setName('');
    setNumber('');
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      <input type="text" value={number} onChange={handleNumberChange} placeholder="Number" />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
}

export default ContactForm;