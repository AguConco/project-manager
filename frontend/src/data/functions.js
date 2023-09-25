import { backURL } from "./constants"

export const generateId = () => {
    const a = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789'
    const id = []

    for (let i = 0; i < 19; i++) {
        id.push(a.charAt(Math.floor(Math.random() * a.length)))
    }
    return id.join('')
}

export const requestsToServer = async (e) => {
    const { file, method, data } = e

    return method === 'POST'
        ? await fetch(backURL + file, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        : await fetch(backURL + file, {
            method
        })
}
export const openFormNewProject = () => {
    const url = '/new-project'
    const windowFeatures = 'width=550,height=650,resizable=no'
    window.open(url, '_blank', windowFeatures)
}