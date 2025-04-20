import { typeList } from '../../constants/contacts.js';

export const parseContactFilterParams = ({ contactType }) => {
  const parsedType = typeList.includes(contactType) ? contactType : undefined;

  return {
    contactType: parsedType,
  };
};
