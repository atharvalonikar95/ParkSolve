export const getUsers = async () => {
    try {
        const res = fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/get-users`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            }
        ).then(res=>res.json())
        return res

    } catch (error) {
        return error
    }
}
export const toggleQRStatus = async (userId) => {
    try {
        const res = fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/change-qrStatus`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body:JSON.stringify({userId})
            }
        ).then(res=>res.json())
        return res

    } catch (error) {
        return error
    }
}