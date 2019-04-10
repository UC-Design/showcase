export const validName = (name) => {
    if (name === null || name.trim() === '') {
        return {
            valid: false,
            msg: 'Please enter your name'
        }
    }

    return { valid: true }
}

export const validUsername = (username) => {
    if (username === null || username.trim() === '') {
        return {
            valid: false,
            msg: 'Please enter your username'
        }
    }

    return { valid: true }
}

export const validEmail = (email) => {
    if (email === null || email.trim() === '') {
        return {
            valid: false,
            msg: 'Please enter your email'
        }
    }

    let re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (re.test(email) === false) {
        return {
            valid: false,
            msg: 'Please enter a valid email address'
        }
    }

    return { valid: true }
}

export const validPassword = (password, confirm_password) => {
    const lenMin = 6
    const lenMax = 100

    if (password === null || password.trim() === '') {
        return {
            valid: false,
            msg: 'Please enter a password'
        }
    }

    if (confirm_password === null || confirm_password.trim() === '') {
        return {
            valid: false,
            msg: 'Please confirm your password'
        }
    }

    if (password !== confirm_password) {
        return {
            valid: false,
            msg: 'Passwords do not match'
        }
    }
   
    // Length Check
    if (password.length < lenMin || password.length > lenMax) {
        return {
            valid: false,
            msg: `Password must between ${lenMin}-${lenMax} characters long`
        }
    }

    return {
        valid: true
    }
}

export const validInterests = (interests) => {
    if (interests.length === 0) {
        return {
            valid: false,
            msg: 'Please select at least one interest'
        }
    }

    if (interests.length > 3) {
        return {
            valid: false,
            msg: 'You\'ve hacked the system!!'
        }
    }

    return {
        valid: true
    }
}