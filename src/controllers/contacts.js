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
import { contactAddSchema } from '../validation/contacts.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactsSortFields);
  const filters = parseContactFilterParams(req.query);
  filters.userId = req.user._id;

  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await getContactId(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found contact with id {contactId}!',
    data,
  });
};

export const addContactController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { error } = contactAddSchema.validate(req.body);

  if (error) {
    throw createHttpError(400, error.message);
  }

  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const { data, isNew } = await updateContact(contactId, req.body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully update contact',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  const { data } = result;

  res.json({
    status: 200,
    message: 'Successfully update contact',
    data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await deleteContactByID(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
