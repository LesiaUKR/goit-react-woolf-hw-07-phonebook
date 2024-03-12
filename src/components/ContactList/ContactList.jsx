import React from 'react';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { getVisibleContacts } from 'redux/selectors';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const visibleContacts = useSelector(getVisibleContacts);

  return (
    <List>
      {visibleContacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} />;
      })}
    </List>
  );
};
