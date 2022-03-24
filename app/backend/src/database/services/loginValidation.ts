// Código reaproveitado de um projeto anterior;

// # Tipagem de retorno

export type ValidationResponse = { status: number, message?: { message: string } };
export type UserInfo = {
  id?: number, username?: string, role?: string, email: string, password: string };

// # Mensagens de Erro:

export const invalidInfo = {
  message: 'Incorrect email or password',
};

const infoRequired = {
  message: 'All fields must be filled',
};

// # Funções úteis:

const emailExists = (email: string) => {
  if (email === undefined) return false;
  if (email.length === 0) return false;
  return true;
};

const validateEmail = (email: string) => {
  // Regex exemplo usado em projetos anteriores (desde o ciclo de fundamentos), visto em:
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  const re = /\S+@\S+\.\S+/;

  if (typeof email !== 'string') return false;
  if (!re.test(email)) return false;
  return true;
};

const passwordExists = (password: string) => {
  if (password === undefined) return false;
  if (password.length === 0) return false;
  return true;
};

const validatePassword = (password: string) => {
  const MINIMUM_LENGTH = 6;
  if (typeof password !== 'string') return false;
  if (password.length < MINIMUM_LENGTH) return false;
  return true;
};

export const validateExistance = (email: string, password: string) => {
  if (!emailExists(email) || !passwordExists(password)) {
    return {
      status: 401,
      message: infoRequired,
    };
  }

  return { status: 200 };
};

export const validateLoginInfo = (email: string, password: string) => {
  if (!validateEmail(email) || !validatePassword(password)) {
    return {
      status: 401,
      message: invalidInfo,
    };
  }

  return { status: 200 };
};
