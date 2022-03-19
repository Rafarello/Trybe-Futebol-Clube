// Código reaproveitado de um projeto anterior;

// # Tipagem de retorno

export type ValidationResponse = { status: number, message?: { message: string } };

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
  // Regex exemplo usado em projetos anteriores (desde o ciclo de fundamentos), visto em:
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  const re = /\S+@\S+\.\S+/;

  if (typeof email !== 'string') return false;
  if (re.test(email)) return false;
  return true;
};

const passwordExists = (password: string | unknown) => {
  if (password === undefined) return false;
  return true;
};

const validatePassword = (password: string) => {
  const MINIMUM_LENGTH = 6;
  if (typeof password !== 'string') return false;
  if (password.length < MINIMUM_LENGTH) return false;
  return true;
};

export const validateEmailInfo = (email: string) => {
  if (!emailExists(email)) {
    return {
      status: 401,
      message: emailRequired,
    };
  }
  if (!validateEmail(email)) {
    return {
      status: 401,
      message: emailInvalid,
    };
  }
  return { status: 200 };
};

export const validatePasswordInfo = (password: string) => {
  if (!passwordExists(password)) {
    return {
      status: 401,
      message: passwordRequired,
    };
  }
  if (!validatePassword(password)) {
    return {
      status: 401,
      message: passwordInvalid,
    };
  }
  return { status: 200 };
};
