import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/slice';function ContactList() {
  const contacts = useSelector(state => state.contacts.data);
  const searchTerm = useSelector(state => state.filter.searchTerm);
  const dispatch = useDispatch();

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact({ id: contactId }));
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div>
      <ul className="list">
        {filteredContacts.map(contact => (
          <li key={contact.id} className="listItem">
            {contact.name}
            <span> </span>
            {contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;