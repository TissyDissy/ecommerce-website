export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const login = (token: string, isAdmin: boolean = false) => {
  localStorage.setItem('token', token);
  localStorage.setItem('isAdmin', isAdmin.toString());
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
};