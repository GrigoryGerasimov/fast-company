export const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Электронная почта введена некорректно"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        },
        hasCapitalChar: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        hasDigit: {
            message: "Пароль должен содержать хотя бы одну цифру"
        },
        min: {
            message: "Пароль должен состоять минимум из 8 символов",
            value: 8
        }
    },
    profession: {
        isRequired: {
            message:
                "Чтобы продолжить, пожалуйста, выберите свою профессию из списка"
        }
    },
    qualities: {
        isRequired: {
            message:
                "Чтобы продолжить, пожалуйста, выберите свои личностные качества из списка"
        }
    },
    license: {
        isRequired: {
            message:
                "Вы не можете использовать наш сервис без лицензионного соглашения"
        }
    }
};
