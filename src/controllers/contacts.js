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
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
  let photo = null;

  const data = await addContact({ ...req.body, userId, photo });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const result = await updateContact(userId, contactId, req.body, {
    upsert: true,
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully update contact',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  let photo = null;

  if (req.file) {
    // posterUrl = await saveFileToLocal(req.file);
    photo = await saveFileToCloudinary(req.file);
  }

  const result = await updateContact(userId, contactId, { ...req.body, photo });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully update contact',
    data: result.contact,
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
