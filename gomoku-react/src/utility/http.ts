/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

/**
 * Sends an HTTP request and returns the response data.
 * @param {RequestInfo} request - The request to send.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 */
export default async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    if (!response.ok) {
        throw new Error(await response.text())
    }
    const headers = response.headers
    const data = headers.get('content-type')?.includes('json')
        ? await response.json()
        : {}
    return data
    }

let token = ''

/**
 * Sets the authentication token to be included in subsequent requests.
 * @param {string} newToken - The new authentication token.
 */
export const setToken = (newToken: string) => (token = newToken)

/**
 * Sends a GET request.
 * @param {string} path - The URL path to send the request to.
 * @returns {Promise<Res>} - A promise that resolves to the response data.
 */
export async function get<Res>(path: string): Promise<Res> {
    return await http<Res>(
        new Request(path, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
    )
}

/**
 * Sends a PUT request.
 * @param {string} path - The URL path to send the request to.
 * @param {Req} body - The request body data.
 * @returns {Promise<Res>} - A promise that resolves to the response data.
 */
export async function put<Req, Res>(path: string, body: Req): Promise<Res> {
    return await http<Res>(
        new Request(path, {
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'put',
        })
    )
}

/**
 * Sends a POST request.
 * @param {string} path - The URL path to send the request to.
 * @param {Req} body - The request body data.
 * @returns {Promise<Res>} - A promise that resolves to the response data.
 */
export async function post<Req, Res>(path: string, body: Req): Promise<Res> {
    return await http<Res>(
        new Request(path, {
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'post',
        })
    )
}

/**
 * Sends a DELETE request.
 * @param {string} path - The URL path to send the request to.
 * @returns {Promise<undefined | null>} - A promise that resolves to undefined or null.
 */
export async function del(path: string): Promise<undefined | null> {
    return await http<undefined | null>(
        new Request(path, {
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            'Content-Type': 'application/json',
        },
        method: 'delete',
        })
    )
}