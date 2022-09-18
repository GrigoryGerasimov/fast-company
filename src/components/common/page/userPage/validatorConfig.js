export const validatorConfig = {
    name: {
        isRequired: {
            message: "Имя обязательно для заполнения"
        }
    },
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Электронная почта введена некорректно"
        }
    },
    profession: {
        isRequired: {
            message: "Профессия обязательна для заполнения"
        }
    },
    qualities: {
        isRequired: {
            message: "Личностные качества обязательны для заполнения"
        }
    },
    userId: {
        isRequired: {
            message: "Пожалуйста выберите отправителя"
        }
    },
    content: {
        isRequired: {
            message: "Пожалуйста введите текст комментария"
        }
    }
};
