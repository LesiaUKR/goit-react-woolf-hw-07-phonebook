import React, { useEffect } from 'react';
import { GlobalStyle } from 'components/Globalstyle.js';
import { Layout, Header, MainHeader } from './Layout.js';
import { ContactsForm } from 'components/ContactsForm/ContactsForm.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts } from 'redux/operations.js';
import { getContacts, selectError, selectIsLoading } from 'redux/selectors.js';
import { Notify } from 'notiflix';
import Loader from './Loader/Loader.jsx';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getAllContacts())
      .unwrap()
      .then()
      .catch(error => {
        console.error('Error retrieving contacts:', error);
        Notify.failure('Error retrieving contacts');
      });
  }, [dispatch]);

  return (
    <Layout>
      <GlobalStyle />
      <MainHeader>Phonebook</MainHeader>
      <ContactsForm />
      <Header>Contacts</Header>
      <Filter />
      {error && <p>Error retrieving contacts: {error.toString()}</p>}
      {isLoading ? <Loader /> : contacts.length > 0 && <ContactList />}
    </Layout>
  );
};

export { App };
