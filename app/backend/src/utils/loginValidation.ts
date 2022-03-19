// Código reaproveitado de um projeto anterior;

// # Mensagens de Erro:

const emailInvalid = {
  message: 'Incorrect email or password',
};
const passwordInvalid = {
  message: 'Incorrect email or password',
};
const passwordRequired = {
  message: 'All fields must be filled',
};

const emailRequired = {
  message: 'All fields must be filled',
};

// # Funções úteis:

const emailExists = (email: string | unknown) => {
  if (email === undefined) return false;
  return true;
};

const validateEmail = (email: string) => {
  const MINIMUM_LENGTH = 1;
  if (typeof email !== 'string') return false;
  if (email.length < MINIMUM_LENGTH) return false;
  return true;
};

const passwordExists = (password: string | unknown) => {
  if (password === undefined) return false;
  return true;
};

const validatePassword = (password: string) => {
  const MINIMUM_LENGTH = 1;
  if (typeof password !== 'string') return false;
  if (password.length < MINIMUM_LENGTH) return false;
  return true;
};

const validateEmailInfo = (email: string) => {
  if (!emailExists(email)) {
    return {
      status: 400,
      message: emailRequired,
    };
  }
  if (!validateEmail(email)) {
    return {
      status: 400,
      message: emailInvalid,
    };
  }
  return 200;
};

const validatePasswordInfo = (password: string) => {
  if (!passwordExists(password)) {
    return {
      status: 400,
      message: passwordRequired,
    };
  }
  if (!validatePassword(password)) {
    return {
      status: 400,
      message: passwordInvalid,
    };
  }
  return 200;
};

module.exports = {
  validateEmailInfo,
  validatePasswordInfo,
};
