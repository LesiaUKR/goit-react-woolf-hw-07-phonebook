import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, getAllContacts } from './operations';

const initialState = { items: [], isLoading: false, error: null };

const getActions = type =>
  isAnyOf(getAllContacts[type], addContact[type], deleteContact[type]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(getAllContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(({ id }) => id !== payload.id);
      })
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;
      })
      .addMatcher(getActions('rejected'), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const contactsReducer = contactsSlice.reducer;
