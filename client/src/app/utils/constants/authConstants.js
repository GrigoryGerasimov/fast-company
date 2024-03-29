export const authConstants = {
    jwt: {
        TOKEN_KEY: "jwt-token",
        REFRESH_KEY: "jwt-refresh-token",
        EXPIRE_DATE_KEY: "jwt-expire-date",
        USERID_KEY: "jwt-userid"
    },
    firebase: {
        KEY: process.env.REACT_APP_FIREBASE_KEY,
        FIREBASE_SIGN_UP_ENDPOINT() {
            return `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.KEY}`;
        },
        FIREBASE_SIGN_IN_WITH_PASS_ENDPOINT() {
            return `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.KEY}`;
        },
        FIREBASE_EXCHANGE_REFRESH_TOKEN() {
            return `https://securetoken.googleapis.com/v1/token?key=${this.KEY}`;
        }
    }
};
