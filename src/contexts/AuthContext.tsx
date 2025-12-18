import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ email: string } | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem("nca_admin_auth");
        const storedUser = localStorage.getItem("nca_admin_user");
        
        if (storedAuth === "true" && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        // For now, using demo credentials
        const validCredentials = {
            email: "admin@ncatwiceast.org",
            password: "@Nyancitarialbeek143#"
        };

        if (email === validCredentials.email && password === validCredentials.password) {
            setIsAuthenticated(true);
            setUser({ email });
            localStorage.setItem("nca_admin_auth", "true");
            localStorage.setItem("nca_admin_user", JSON.stringify({ email }));
            return true;
        }
        
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("nca_admin_auth");
        localStorage.removeItem("nca_admin_user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
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

