export const createError = (status, message, fails) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  err.fails = fails || undefined;
  return err;
};
