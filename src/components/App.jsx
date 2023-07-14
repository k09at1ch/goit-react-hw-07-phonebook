import React from 'react';
import style from './Class.module.css';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
  

function App() {
  return (
    <div className={style.all}>
      <h1 className={style.all}>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}

export default App;
