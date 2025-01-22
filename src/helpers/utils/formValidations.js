import { validateUserName, validateEmail, validatePassword, validateConfirmPassword } from "../utils/onChangeValidation";

const signUpValidate = (inputValue, setError) => {
    let isValid = true;

    const validUserName = validateUserName(inputValue.username);
    setError((prev) => {
        return {
            ...prev,
            username: validUserName,
        };
    });
    if (validUserName !== null) isValid = false;

    const validEmail = validateEmail(inputValue.email);
    setError((prev) => {
        return {
            ...prev,
            email: validEmail,
        };
    });
    if (validEmail !== null) isValid = false;

    const validPassword = validatePassword(inputValue.password);
    setError((prev) => {
        return {
            ...prev,
            password: validPassword,
        };
    });
    if (validPassword !== null) isValid = false;

    const validConfirmPassword = validateConfirmPassword(
        inputValue.password,
        inputValue.confirmPassword
    );
    setError((prev) => {
        return {
            ...prev,
            confirmPassword: validConfirmPassword,
        };
    });
    if (validConfirmPassword !== null) isValid = false;

    return isValid;
};

function movieCardValidate(inputValue, setError) {
    let isValid = true;
    if (inputValue.name.length < 25) {
        setError((prev) => ({
            ...prev,
            name: null,
        }));
        isValid = true;
    }

    if (!isNaN(inputValue.publishYear)) {
        setError((prev) => ({
            ...prev,
            publishYear: null,
        }));
        isValid = true;
    }

    if (inputValue.name == "") {
        setError((prev) => ({
            ...prev,
            name: "Name is required.",
        }));
        isValid = false;
    }

    if (inputValue.publishYear == "") {
        setError((prev) => ({
            ...prev,
            publishYear: "Publish Year is required.",
        }));
        isValid = false;
    }

    if (inputValue.name.length > 25) {
        setError((prev) => ({
            ...prev,
            name: "Name length should be less than 25.",
        }));
        isValid = false;
    }

    if (isNaN(inputValue.publishYear)) {
        setError((prev) => ({
            ...prev,
            publishYear: "Publish Year is not a number.",
        }));
        isValid = false;
    }

    return isValid;
}

export { signUpValidate, movieCardValidate };
