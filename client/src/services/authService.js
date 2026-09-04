export const Login = async (formData) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }
}

export const Register = async (formData) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }
}

export const GenerateOTP = async (email) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/generate-otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(email)
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }
}

export const VerifyCode = async (email, otp) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/verify-otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(email, otp)
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }

}
export const resetPass = async (email, password) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/reset-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(email, password)
        })
        const data = await res.json()
        console.log(res)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }

}

export const fetchUser = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        const data = await response.json()
        if (response.ok &&  data.user) {
            return data.user
        } else {
            return data.message
        }
    } catch (error) {
        console.error("Failed to fetch user:", error)
    } finally {
    }
}

