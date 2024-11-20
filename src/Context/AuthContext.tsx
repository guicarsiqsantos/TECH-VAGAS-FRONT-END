import api from "@/services/api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  status: string | null;
}

export type UserType = {
  status: boolean;
  response: Response;
};

export interface Response {
  usuarioId: number;
  nome: string;
  cpfCnpj: string;
  email: string;
  senha: string;
  userType: number;
}

interface AuthContextProps {
  authState: AuthState;
  logout: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  getUser: () => any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    status: null,
  });

  useEffect(() => {
    const auth = localStorage.getItem("authToken");
    if (auth) {
      setAuthState({
        isAuthenticated: true,
        token: auth,
        status: localStorage.getItem("authStatus"),
      });
    }
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    await api.put("/Sessao/Close", { token: token }).then(() => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authStatus");
      localStorage.removeItem("user");
      setAuthState({ isAuthenticated: false, token: null, status: null });
    });
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
