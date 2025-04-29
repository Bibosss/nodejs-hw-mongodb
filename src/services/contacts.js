import { SORT_ORDER } from '../constants/index.js';
import ContactColection from '../db/models/contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  userId,
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactColection.find({ userId });

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactColection.countDocuments({ userId });

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactId = (contactId, userId) =>
  ContactColection.findOne({ _id: contactId, userId });

export const addContact = (payload) => ContactColection.create(payload);

export const updateContact = async (_id, payload, options = {}, userId) => {
  const { upsert = false } = options;
  const rawResult = await ContactColection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      upsert,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactByID = (_id, userId) =>
  ContactColection.findOneAndDelete({ _id, userId });
