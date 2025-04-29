import createHttpError from 'http-errors';

import {
  getContacts,
  getContactId,
  addContact,
  updateContact,
  deleteContactByID,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactsSortFields } from '../db/models/contacts.js';

export const getContactsController = async (req, res, next) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactsSortFields);
  const { _id: userId } = req.user;
  // const filters = parseContactFilterParams(req.query);
  // filters.userId = req.user._id;

  const data = await getContacts({
    userId,
    ...paginationParams,
    ...sortParams,
    // filters,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const data = await getContactId(contactId, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const { data, isNew } = await updateContact(
    contactId,
    { ...req.body, userId },
    {
      upsert: true,
    },
    userId,
  );
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully update contact',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact(contactId, req.body, userId);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully update contact',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContactByID(contactId, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
