import { createContext, useEffect, useReducer } from "react";
import { ACTION } from "./AuthContextType";
import { setSession, isValidToken } from "../utils/jwt";
import axios from "../utils/axios";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.INITIAL:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case ACTION.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case ACTION.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case ACTION.REGISTER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && isValidToken(token)) {
          setSession(token);

          const res = await axios.get("/me");

          dispatch({
            type: ACTION.INITIAL,
            payload: {
              isAuthenticated: true,
              user: res?.data,
            },
          });
        } else {
          dispatch({
            type: ACTION.INITIAL,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: ACTION.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (users_email, users_password) => {
    try {
      const response = await axios.post("/auth", {
        users_email,
        users_password,
      });
  
      const { token } = response.data;
  
      setSession(token);
  
      const res = await axios.get("/me");
  
      dispatch({
        type: ACTION.LOGIN,
        payload: {
          user: res?.data,
        },
      }); 
    } catch (error) {
      alert(error?.message)
      dispatch({
        type: ACTION.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      }); 
    }
  };

  const register = async (
    users_picture,
    users_fullname,
    users_email,
    users_password,
    users_role
  ) => {
    const response = await axios.post(
      "/user",
      {
        users_picture,
        users_fullname,
        users_email,
        users_password,
        users_role,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if(response.status === 200) {
       alert('REGISTER SUCCESS') 
       window.location.href = '/'
    } else {
      alert('REGISTER FAILED') 
       return false;
    }

    dispatch({
      type: ACTION.REGISTER,
      payload: {
        user: null,
      },
    });
  };

  const logout = async () => {
    setSession(null)
    dispatch({
      type: ACTION.LOGOUT,
      payload: {
        user: null,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
