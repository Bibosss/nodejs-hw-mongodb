import ContactColection from '../db/models/contacts.js';

export const getContacts = () => ContactColection.find();

export const getContactId = (contactId) =>
  ContactColection.findOne({ _id: contactId });

export const addContact = (payload) => ContactColection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await ContactColection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactByID = (_id) =>
  ContactColection.findByIdAndDelete(_id);
