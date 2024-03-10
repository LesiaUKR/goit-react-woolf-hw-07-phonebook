export const getContacts = state => state.contacts;
console.log('getContacts', getContacts);
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const getFilter = state => state.filter;
