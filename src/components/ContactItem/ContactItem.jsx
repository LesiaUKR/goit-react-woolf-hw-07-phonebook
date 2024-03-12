import React from 'react';
import { ListItem, DeleteButton, ListItemName } from './ContactItem.styled';
import { HiUser } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { Notify } from 'notiflix';

export const ContactItem = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        Notify.failure(`Contact deleted`);
      })
      .catch(rejectedValueOrSerializedError => {
        console.log(
          'rejectedValueOrSerializedError',
          rejectedValueOrSerializedError
        );
        Notify.failure(`Something went wrong`);
      });
  };

  return (
    <ListItem>
      <HiUser />
      <ListItemName>
        {name}: {number}
      </ListItemName>
      <DeleteButton type="button" id={id} onClick={handleDeleteContact}>
        <MdDelete />
        Delete
      </DeleteButton>
    </ListItem>
  );
};
