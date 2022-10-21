import fails from '../fails.js';
import { createError } from '../error.js';
import { validate } from 'deep-email-validator';

export const verifyInput = async (req, res, next) => {
  const { name, email, phone, position_id } = req.body;
  const currentFails = {};

  if (!name || String(name).length < 2) currentFails.name = fails.name[0];

  const isEmail = await validate({
    email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: false,
  });

  if (!email || !String(email) || !isEmail.valid)
    currentFails.email = fails.email[0];

  if (
    !phone ||
    String(phone).length !== 13 ||
    !String(phone).startsWith('+380')
  )
    currentFails.phone = fails.phone[0];

  if (!position_id || !Number(position_id) || Number(position_id) < 1)
    currentFails.position_id = fails.position_id[0];

  if (!req.file) currentFails.photo = fails.photo[1];

  if (Object.keys(currentFails).length !== 0)
    return next(createError(422, 'Validation failed', currentFails));

  next();
};
