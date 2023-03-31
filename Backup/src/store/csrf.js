// export async function restoreCSRF () {
//     let res = await fetch('/api/session');
//     let token = res.headers.get('X-CSRF-Token');
//     sessionStorage.setItem('X-CSRF-Token', token)
//     let data = await res.json();
//     sessionStorage.setItem('currentUser', JSON.stringify(data.user));
// }

export function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

export async function restoreCSRF() {
    const response = await csrfFetch('/api/session')
    storeCSRFToken(response);
    return response;
}

async function csrfFetch(url, options = {}) {

    options.headers ||= {}
    options.method ||= 'GET'

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options); 

    if (res.status >=  400) throw res;

    return res;

}

export default csrfFetch;
