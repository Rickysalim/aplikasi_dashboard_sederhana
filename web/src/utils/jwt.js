import axios from "./axios";
import jwtDecode from 'jwt-decode';

const isValidToken = (token) => {
    if(!token) {
        return false
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.info(currentTime)
    return decoded?.exp > currentTime;
}

const handleTokenExpired = (exp) => {
    let expiredTimer;
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;
    clearTimeout(expiredTimer)
    expiredTimer = setTimeout(() => {
        alert('Token expired');
        localStorage.removeItem('token')
        window.location.href = '/'
    }, timeLeft)
}

const setSession = (token) => {
    if (token) {
        localStorage.setItem('token',token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        const { exp } = jwtDecode(token)
        handleTokenExpired(exp)
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization
        window.location.href = '/'
    }
}

export {isValidToken, setSession}