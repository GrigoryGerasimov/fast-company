export class FirebaseAuthError extends Error {
    static errors = {
        EMAIL_EXISTS: {
            email: "Пользователь с данным адресом электронной почты уже существует"
        },
        OPERATION_NOT_ALLOWED: {
            password: "Функция авторизации с помощью пароля в данном приложении отключена"
        },
        TOO_MANY_ATTEMPTS_TRY_LATER: {
            password: "Слишком много попыток авторизации за максимально короткий промежуток времени. В целях безопасности возможность входа в приложение временно заблокирована. Попробуйте ещё раз позже"
        },
        EMAIL_NOT_FOUND: {
            email: "Пользователь с данным адресом электронной почты не найден"
        },
        INVALID_PASSWORD: {
            password: "Неправильный логин или пароль"
        },
        USER_DISABLED: {
            email: "Учётная запись пользователя была деактивирована. Пожалуйста, обратитесь к администратору приложения"
        }
    };

    constructor(message) {
        super(message);
        return this.format();
    }

    format() {
        for (const error in FirebaseAuthError.errors) {
            if (this.message === error) {
                return FirebaseAuthError.errors[error];
            }
        }
    }
}
