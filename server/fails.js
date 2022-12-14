export default {
  name: [
    'The name must be at least 2 characters.',
    'The name must be no longer than 50 characters.',
  ],
  email: ['The email must be a valid email address.'],
  phone: ['The phone field is required.'],
  position_id: ['The position id must be an integer.'],
  photo: ['The photo may not be greater than 5 Mbytes.', 'Image is invalid.'],
  count: ['The count must be an integer.'],
  page: ['The page must be at least 1.'],
  user_id: ['The user_id must be an integer.', 'User not found'],
};
