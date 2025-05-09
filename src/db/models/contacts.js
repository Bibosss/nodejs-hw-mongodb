import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: typeList[0],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

contactsSchema.post('save', handleSaveError);

contactsSchema.pre('findOneAndUpdate', setUpdateSettings);

contactsSchema.post('findOneAndUpdate', handleSaveError);

export const contactsSortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
];

const ContactColection = model('contact', contactsSchema);

export default ContactColection;
