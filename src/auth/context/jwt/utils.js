
import { paths } from 'src/routes/paths';
import axios from 'src/utils/axios';

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const tokenExpired = (exp) => {
  let expiredTimer;
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');
    localStorage.removeItem('accessToken');
    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    console.log('Authorization header set:', axios.defaults.headers.common.Authorization); // Debug
    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
    console.log('Authorization header removed'); // Debug
  }
};