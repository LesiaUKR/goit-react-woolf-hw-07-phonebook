import React from 'react';
import { ListItem, DeleteButton, ListItemName } from './ContactItem.styled';
import { HiUser } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const ContactItem = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <HiUser />
      <ListItemName>
        {name}: {number}
      </ListItemName>
      <DeleteButton
        type="button"
        id={id}
        onClick={() => dispatch(deleteContact(id))}
      >
        <MdDelete />
        Delete
      </DeleteButton>
    </ListItem>
  );
};
