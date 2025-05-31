// import PropTypes from 'prop-types';
// import { useEffect, useReducer, useCallback, useMemo } from 'react';
// // utils
// import axios, { endpoints } from 'src/utils/axios';
// //
// import { AuthContext } from './auth-context';
// import { isValidToken, setSession } from './utils';

// // ----------------------------------------------------------------------

// // NOTE:
// // We only build demo at basic level.
// // Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// // ----------------------------------------------------------------------

// const initialState = {
//   user: null,
//   loading: true,
// };

// const reducer = (state, action) => {
//   if (action.type === 'INITIAL') {
//     return {
//       loading: false,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGIN') {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'REGISTER') {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGOUT') {
//     return {
//       ...state,
//       user: null,
//     };
//   }
//   return state;
// };

// // ----------------------------------------------------------------------

// const STORAGE_KEY = 'accessToken';

// export function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const initialize = useCallback(async () => {
//     try {
//       const accessToken = sessionStorage.getItem(STORAGE_KEY);

//       if (accessToken && isValidToken(accessToken)) {
//         setSession(accessToken);

//         const response = await axios.get(endpoints.auth.me);

//         const { user } = response.data;

//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user,
//           },
//         });
//       } else {
//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user: null,
//           },
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch({
//         type: 'INITIAL',
//         payload: {
//           user: null,
//         },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   // LOGIN
//   const login = useCallback(async (email, password) => {
//     const data = {
//       email,
//       password,
//     };

//     const response = await axios.post(endpoints.auth.login, data);

//     const { accessToken, user } = response.data;

//     setSession(accessToken);
    

//     dispatch({
//       type: 'LOGIN',
//       payload: {
//         user,
//       },
//     });
//   }, []);

//   // REGISTER
//   const register = useCallback(async (email, password, firstName, lastName) => {
//     const data = {
//       email,
//       password,
//       firstName,
//       lastName,
//     };

//     const response = await axios.post(endpoints.auth.register, {...data, permissions: ["customer"], isActive: true, isDeleted: false});

//     const { accessToken, user } = response.data;

//     sessionStorage.setItem(STORAGE_KEY, accessToken);

//     dispatch({
//       type: 'REGISTER',
//       payload: {
//         user,
//       },
//     });
//   }, []);

//   // LOGOUT
//   const logout = useCallback(async () => {
//     setSession(null);
//     dispatch({
//       type: 'LOGOUT',
//     });
//   }, []);

//   // ----------------------------------------------------------------------

//   const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

//   const status = state.loading ? 'loading' : checkAuthenticated;

//   const memoizedValue = useMemo(
//     () => ({
//       user: state.user,
//       method: 'jwt',
//       loading: status === 'loading',
//       authenticated: status === 'authenticated',
//       unauthenticated: status === 'unauthenticated',
//       //
//       login,
//       register,
//       logout,
//     }),
//     [login, logout, register, state.user, status]
//   );

//   return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
// }

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };



// import PropTypes from 'prop-types';
// import { useEffect, useReducer, useCallback, useMemo } from 'react';
// import axios, { endpoints } from 'src/utils/axios';
// import { AuthContext } from './auth-context';
// import { isValidToken, setSession } from './utils';

// const initialState = {
//   user: null,
//   loading: true,
// };

// const reducer = (state, action) => {
//   if (action.type === 'INITIAL') {
//     return {
//       loading: false,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGIN') {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'REGISTER') {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGOUT') {
//     return {
//       ...state,
//       user: null,
//     };
//   }
//   return state;
// };

// const STORAGE_KEY = 'accessToken';

// export function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const initialize = useCallback(async () => {
//     try {
//       const accessToken = localStorage.getItem(STORAGE_KEY);

//       if (accessToken && isValidToken(accessToken)) {
//         setSession(accessToken);
//         const response = await axios.get(endpoints.auth.me);
//         console.log('Full API response:', response.data);
//         const user = response.data; // API returns user object directly

//         console.log('User fetched on initialize:', user);

//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user,
//           },
//         });
//       } else {
//         console.log('No valid token found');
//         setSession(null);
//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user: null,
//           },
//         });
//       }
//     } catch (error) {
//       console.error('Initialize error:', error.response?.data || error.message);
//       setSession(null);
//       dispatch({
//         type: 'INITIAL',
//         payload: {
//           user: null,
//         },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   const login = useCallback(async (email, password) => {
//     try {
//       const data = { email, password };
//       const response = await axios.post(endpoints.auth.login, data);
//       const { accessToken, ...user } = response.data; // API returns accessToken and user fields

//       localStorage.setItem(STORAGE_KEY, accessToken);
//       setSession(accessToken);

//       dispatch({
//         type: 'LOGIN',
//         payload: {
//           user,
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error.response?.data || error.message);
//       throw error;
//     }
//   }, []);

//   const register = useCallback(async (email, password, firstName, lastName) => {
//     const data = {
//       email,
//       password,
//       firstName,
//       lastName,
//     };

//     const response = await axios.post(endpoints.auth.register, {
//       ...data,
//       permissions: ['customer'],
//       isActive: true,
//       isDeleted: false,
//     });

//     const { accessToken, ...user } = response.data; // API returns accessToken and user fields

//     localStorage.setItem(STORAGE_KEY, accessToken);
//     setSession(accessToken);

//     dispatch({
//       type: 'REGISTER',
//       payload: {
//         user,
//       },
//     });
//   }, []);

//   const logout = useCallback(async () => {
//     setSession(null);
//     localStorage.removeItem(STORAGE_KEY);
//     dispatch({
//       type: 'LOGOUT',
//     });
//   }, []);

//   const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

//   const status = state.loading ? 'loading' : checkAuthenticated;

//   const memoizedValue = useMemo(
//     () => ({
//       user: state.user,
//       method: 'jwt',
//       loading: status === 'loading',
//       authenticated: status === 'authenticated',
//       unauthenticated: status === 'unauthenticated',
//       login,
//       register,
//       logout,
//     }),
//     [login, logout, register, state.user, status]
//   );

//   return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
// }

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };





import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: null, // Do not set user on registration
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('AuthProvider initialized');

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
    console.log('Running initialize effect');
    initialize();
  }, [initialize]);

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

  const register = useCallback(async (email, password, firstName, lastName, phone) => {
    try {
      const data = {
        firstName,
        lastName,
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

      console.log('User registered, userData:', response.data.userData);

      // Dispatch REGISTER action without setting user
      dispatch({
        type: 'REGISTER',
        payload: {
          user: null,
        },
      });
    } catch (error) {
      console.error('Register error:', {
        message: error.message || 'No error message provided',
        response: error.response?.data || response.data || 'No response data',
        status: error.response?.status || 'No status code',
        stack: error.stack || 'No stack trace',
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
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};