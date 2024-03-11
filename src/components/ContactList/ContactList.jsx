import React, { useEffect } from 'react';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAllContacts } from 'redux/operations';
import { getVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const visibleContacts = useSelector(getVisibleContacts);
  console.log('visibleContacts', visibleContacts);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllContacts());
  // }, [dispatch]);

  // const contacts = useSelector(state => state.contacts);
  // console.log('contacts', contacts);
  return (
    <>
      {/* {visibleContacts.isLoading && <div>Loading...</div>} */}
      {
        <List>
          {visibleContacts.map(contact => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
        </List>
      }
      {/* {visibleContacts.error && <div>Error: {visibleContacts.error}</div>} */}
    </>
  );
};
