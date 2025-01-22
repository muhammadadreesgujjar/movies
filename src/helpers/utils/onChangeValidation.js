const validateUserName = (name) => {
    if (name.length == 0) return "UserName is required";
    return null
}

const validateEmail = (email) => {
    const regixEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.length == 0) return "Email is required";
    if (!regixEmail.test(email.toLowerCase())) return "Email is not valid";
    return null
}

const validatePassword = (password) => {
    if (password.length == 0) return "Password is required";
    if (password.length < 5) return "Password length should not less than 5";
    return null
}

const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword.length == 0) return "Confirm Password is required";
    if (confirmPassword !== password) return "Confirm Password does not match with Password";
    return null
}

export { validateUserName, validateEmail, validatePassword, validateConfirmPassword };