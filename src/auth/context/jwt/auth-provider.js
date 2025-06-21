import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom'; // Add this import for navigation tracking
import axios, { endpoints } from 'src/utils/axios';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        loading: false,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case 'REGISTER':
      return {
        ...state,
        user: null,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation(); // Track navigation changes

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        console.log('Fetching user with token:', accessToken);
        const response = await axios.get(endpoints.auth.me);
        console.log('Initialize API response:', response.data);
        const user = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user,
          },
        });
      } else {
        console.log('No valid token found');
        setSession(null);
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error('Initialize error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setSession(null);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    console.log('Running initialize effect due to navigation or mount');
    initialize();
  }, [initialize, location.pathname]); // Re-run on pathname change

  const login = useCallback(async (email, password) => {
    try {
      const data = { email, password };
      console.log('Login payload:', data);
      const response = await axios.post(endpoints.auth.login, data);
      console.log('Login response:', response.data);
      const { accessToken, ...user } = response.data;

      localStorage.setItem(STORAGE_KEY, accessToken);
      setSession(accessToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  }, []);

  const register = useCallback(async (email, password, fullName, phone) => {
      try {
        const data = {
          fullName,
          email,
          password,
          phoneNumber: phone,
          permissions: ['customer'],
          isActive: true,
          isDeleted: false,
      };

      console.log('Register attempt with payload:', data);

      const response = await axios.post(endpoints.auth.register, data);
      console.log('Register response:', response.data);

      if (!response.data.success || !response.data.userData) {
        throw new Error('Invalid API response structure: missing userData or success flag');
      }

      dispatch({
        type: 'REGISTER',
        payload: {
          user: null,
        },
      });

      localStorage.setItem(STORAGE_KEY, response.data.accessToken);
      setSession(response.data.accessToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: response.data.userData,
        },
      });
    } catch (error) {
      console.error('Register error:', {
        message: error.message || 'No error message provided',
        response: error.response?.data || 'No response data',
        status: error.response?.status || 'No status code',
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    console.log('Logging out');
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // for google login
  const googleLogin = useCallback(async (accessToken, userProfile) => {
    console.log('Logging with google');
    localStorage.setItem(STORAGE_KEY, accessToken);
    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: userProfile,
      },
    });
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      register,
      logout,
      googleLogin
    }),
    [login, logout, register, state.user, status, googleLogin]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};