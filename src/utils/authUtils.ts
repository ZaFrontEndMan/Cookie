
export const AUTH_TOKEN_KEY = 'auth_token';

export const setAuthToken = (token: string, expiryDays = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${AUTH_TOKEN_KEY}=${token};${expires};path=/`;
};

export const getAuthToken = (): string | null => {
  const name = AUTH_TOKEN_KEY + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const removeAuthToken = () => {
  document.cookie = `${AUTH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
