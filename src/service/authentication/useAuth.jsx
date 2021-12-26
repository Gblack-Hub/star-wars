export default function useAuth() {
    return localStorage.getItem("isLoggedIn");
}