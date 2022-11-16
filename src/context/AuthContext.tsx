import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import * as apiClient from "../api/api-client";
import { User } from "../components/LoginForm";


interface AuthContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    token?: string | null;
    loading: boolean;
    error?: any;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [token, setToken] = useState<string | null>("");
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    // We are using `react-router` for this example,
    // but feel free to omit this or use the
    // router of your choice.
    const location = useLocation();
    const navigate = useNavigate();

    // If we change page, reset the error state.
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoadingInitial(false);
            navigate('/login', { state: { error: 'Please log in' } })
        };

        setLoadingInitial(false);
        setToken(token);
    }, []);

    // Flags the component loading state and posts the login
    // data to the server.
    //
    // An error means that the email/password combination is
    // not valid.
    //
    // Finally, just signal the component that loading the
    // loading state is over.
    function login(user: User) {
        setLoading(true);

        apiClient.post('/login', user).then((res) => {
            localStorage.setItem('token', res.token);
            setToken(res.token);
            navigate('/');
        }).catch((error) => {
            setError(error.msg);
        }).finally(() => {
            setLoading(false);
        })     
    }

    function logout() {
        setToken("");
        navigate('/login');
    }

    // Make the provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    const memoedValue = useMemo(
        () => {
            console.log(token);
            return {
                token,
                loading,
                error,
                login,
                logout,
            }
        },
        [token, loading, error]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    console.log(useContext(AuthContext))
    return useContext(AuthContext);
}