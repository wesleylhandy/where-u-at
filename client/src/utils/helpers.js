import axios from 'axios';

export function getSession() {
    return new Promise((resolve, reject) => {
        axios.get('/auth/session').then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}


export function authUser(username, password) {
    return new Promise((resolve, reject) => {
        axios.post('/auth/twitter', { username, password }).then(response => {
            resolve(response.data);
        }).catch(err => {
            if (err) reject(err.response.data);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function unAuthUser() {
    return new Promise((resolve, reject) => {
        axios.post('/auth/logout').then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}