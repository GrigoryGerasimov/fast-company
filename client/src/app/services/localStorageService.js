import { setIntoStorage, getFromStorage } from "../utils/storage";
import { authConstants } from "../utils/constants/authConstants.js";

const { TOKEN_KEY, REFRESH_KEY, EXPIRE_DATE_KEY, USERID_KEY } = authConstants.jwt;

export const setTokens = ({ refreshToken, accessToken, userId, expiresIn = 3600 }) => {
    const expireDate = Date.now() + (expiresIn * 1000);
    setIntoStorage(TOKEN_KEY, accessToken);
    setIntoStorage(REFRESH_KEY, refreshToken);
    setIntoStorage(EXPIRE_DATE_KEY, expireDate);
    setIntoStorage(USERID_KEY, userId);
};

export const getTokens = () => {
    const accessToken = getFromStorage(TOKEN_KEY);
    const refreshToken = getFromStorage(REFRESH_KEY);
    const tokenExpireDate = getFromStorage(EXPIRE_DATE_KEY);
    const userId = getFromStorage(USERID_KEY);
    return { accessToken, refreshToken, tokenExpireDate, userId };
};

export const removeTokens = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRE_DATE_KEY);
    localStorage.removeItem(USERID_KEY);
};

const localStorageService = {
    setTokens,
    getTokens,
    removeTokens
};

export default localStorageService;
