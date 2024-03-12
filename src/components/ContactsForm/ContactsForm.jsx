import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { getContacts, selectIsLoading } from '../../redux/selectors';
import { Formik } from 'formik';
import { HiUserAdd } from 'react-icons/hi';
import {
  Form,
  FormLabel,
  Field,
  AddButton,
  ErrorMessage,
} from 'components/ContactsForm/ContactsForm.styled.js';
import { addContact } from 'redux/operations';
import { Notify } from 'notiflix';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'the name is too short')
    .max(100, 'the name is too long')
    .required('the name is required'),
  number: Yup.string()
    .min(3, 'the number is too short')
    .max(50, 'the number is too long')
    .required('the number is required'),
});

export const ContactsForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = ({ name, number }, actions) => {
    const normName = name.toLowerCase();
    const existstName = contacts.find(
      ({ name }) => name.toLowerCase() === normName
    );
    if (existstName) {
      Notify.warning(`This ${name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name, number }))
      .then(() => {
        Notify.success(`New contact added`);
      })
      .catch(() => {
        Notify.failure(`Something went wrong`);
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormLabel htmlFor="name">
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="div" />
        </FormLabel>
        <FormLabel htmlFor="number">
          Phone number
          <Field
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Phone number must be digits and can contain spaces, dashes, pa-rentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="span" />
        </FormLabel>
        <AddButton type="submit" disabled={isLoading}>
          <HiUserAdd />
          Add contact
        </AddButton>
      </Form>
    </Formik>
  );
};
