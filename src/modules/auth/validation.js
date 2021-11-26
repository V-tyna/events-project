export function validateEmail(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (!expression.test(email)) {
        console.log('Your email is out of line!');
    } else {
        return true;
    }
}

export function validatePassword(password) {
   if (!password.length > 6) {
       console.log('Your password is out of line!');
   } else {
       return true;
   }
}

export function validateRepeatedPassword(password, repeatedPassword) {
    if (password !== repeatedPassword) {
        console.log('Your passwords mismatch!');
        return false;
    } else {
        return true;
    }
}