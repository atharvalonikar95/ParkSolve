
export const CompleteProfile = async (contacts) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/complete-profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ contacts: contacts })
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Failed to fetch user:", error)
    }
}
export const setPh = async (phone) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/set-phone`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ phone })
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Failed to fetch user:", error)
    }
}
export const newQR = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/generate-qr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Failed to fetch qr:", error)
    }
}

export const fetchVehicleDetails = async (qrToken) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/vehicle-owner/${qrToken}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data.user

    } catch (error) {
        console.error("Failed to Details:", error)

    }
}

export const getMyQR = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/get-qr`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Failed to fetch qr:", error)
    }
}

export const deleteEmergencyContact=async(id)=>{
        try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/delete-contact`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body:JSON.stringify({id})
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error("Failed to delete contact :", error)
    }
}