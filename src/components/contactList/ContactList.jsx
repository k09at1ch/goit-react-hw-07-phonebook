import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/contacts/slice';
import axios from 'axios';

function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const searchTerm = useSelector((state) => state.filter.searchTerm);
  const dispatch = useDispatch();

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`https://64b0f877062767bc48256aba.mockapi.io/contacts/${contactId}/`);

      await dispatch(deleteContact({ id: contactId }));
      await dispatch(fetchContacts());
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const index = phoneNumber.indexOf('x');
    if (index !== -1) {
      return phoneNumber.substring(0, index).replace(/\D/g, '');
    }
    return phoneNumber.replace(/\D/g, '');
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ul className="list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="listItem">
            {contact.name}
            <br />
            {formatPhoneNumber(contact.phone)}
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            <br /><br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
