export const validator = (data, config) => {
    const errors = {};
    const validate = (validateMethod, data, config) => {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired": {
            statusValidate = !data.trim();
            break;
        }
        case "isEmail": {
            const emailRegExp = /\S+@\S+\.\S+/g;
            statusValidate = !emailRegExp.test(data);
            break;
        }
        case "hasCapitalChar": {
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = !capitalRegExp.test(data);
            break;
        }
        case "hasDigit": {
            const digitRegExp = /\d+/g;
            statusValidate = !digitRegExp.test(data);
            break;
        }
        case "min": {
            statusValidate = data.length < config.value;
            break;
        }
        default: break;
        }
        if (statusValidate) return config.message;
    };
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error && !errors[fieldName]) errors[fieldName] = error;
        }
    }
    return errors;
};