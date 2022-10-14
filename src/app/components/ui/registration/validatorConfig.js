export const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Электронная почта введена некорректно"
        },
        emailAlreadyExists: {
            message: "(Валидация до отправки формы) Пользователь с данным адресом электронной почты уже существует"
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
    firstName: {
        isRequired: {
            message: "Имя обязательно для заполнения"
        },
        min: {
            message: "Имя должно состоять минимум из 2 символов",
            value: 2
        }
    },
    lastName: {
        isRequired: {
            message: "Фамилия обязательна для заполнения"
        },
        min: {
            message: "Фамилия должна состоять минимум из 2 символов",
            value: 2
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
