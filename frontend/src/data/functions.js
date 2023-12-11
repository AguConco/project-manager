import { backURL } from "./constants"

export const generateId = () => {
    const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const id = []

    for (let i = 0; i < 19; i++) {
        id.push(a.charAt(Math.floor(Math.random() * a.length)))
    }
    return id.join('')
}

export const requestsToServer = async (e) => {
    const { route, method, data } = e

    console.log(data)

    if (method === 'POST' || method === 'PUT' || method === 'DELETE'){
        return await fetch(backURL + route, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    } else {
        return await fetch(backURL + route, {
            method
        })
    }
}
