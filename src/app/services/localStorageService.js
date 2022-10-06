import { setIntoStorage } from "../utils/storage/setIntoStorage.js";
import { getFromStorage } from "../utils/storage/getFromStorage.js";
import { authConstants } from "../utils/constants/authConstants.js";

export const setTokens = ({ refreshToken, idToken, expiresIn = 3600 }) => {
    const expireDate = Date.now() + (expiresIn * 1000);
    setIntoStorage(authConstants.jwt.TOKEN_KEY, idToken);
    setIntoStorage(authConstants.jwt.REFRESH_KEY, refreshToken);
    setIntoStorage(authConstants.jwt.EXPIRE_DATE_KEY, expireDate);
};

export const getTokens = () => {
    const accessToken = getFromStorage(authConstants.jwt.TOKEN_KEY);
    const refreshToken = getFromStorage(authConstants.jwt.REFRESH_KEY);
    const tokenExpireDate = getFromStorage(authConstants.jwt.EXPIRE_DATE_KEY);
    return { accessToken, refreshToken, tokenExpireDate };
};

const localStorageService = {
    setTokens,
    getTokens
};

export default localStorageService;
