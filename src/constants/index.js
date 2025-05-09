import path from 'node:path';

export const SORT_ORDER = ['asc', 'desc'];

export const SMTP = {
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.resolve('src', 'templates');
export const TEMP_FILE_DIR = path.resolve('temp');
export const UPLOAD_FILE_DIR = path.resolve('upload');

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
