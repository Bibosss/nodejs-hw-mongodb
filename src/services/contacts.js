import ContactColection from '../db/models/contacts.js';

export const getContacts = () => ContactColection.find();

export const getContactId = (contactId) =>
  ContactColection.findOne({ _id: contactId });
