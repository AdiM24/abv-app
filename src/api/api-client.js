async function client(
    endpoint,
    {body, ...customConfig} = {}
) {
    let apiURL = 'http://localhost:4001';
    const token = localStorage.getItem('token');
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const config = {
        method: customConfig.method,
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,

        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    const response = await window.fetch(`${apiURL}${endpoint}`, config);

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location = '/login';
    }
    console.log(response);
    const data = await response.json().then((result) => {
        if (response.ok) {
            if (result?.errors && result.errors[0] !== null) {
                return Promise.reject(result);
            }
        }
        if (!response.ok) {
            return Promise.reject(result);
        }

        return result;
    }).catch((err) => {
        return Promise.reject(err);
    });

    if (response.ok) {
        return Promise.resolve(data);
    }
}

export function get(url) {
    return client(url, {
        method: "GET",
    });
}

export function post(url, data) {
    return client(url, {
        method: "POST",
        body: data,
    });
}

export function put(url, data) {
    return client(url, {
        method: "PUT",
        body: data,
    });
}

export function remove(url) {
    return client(`${url}`, {method: "DELETE"});
}

export function patch(url, data) {
    return client(`${url}`, {method: "PATCH", body: data});
}