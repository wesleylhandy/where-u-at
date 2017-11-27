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

export function getYelpToken() {

    function getNewToken(success, failure) {
        //get new yelp token
        axios.get('/auth/newYelpToken')
            .then(response => success(response.data))
            .catch(err => failure(err))

    }

    return new Promise((resolve, reject) => {
        axios.get('/auth/getYelpToken').then(response => {
            //if token exists - send it back to app
            if (response && response.data && response.data.hasOwnProperty('access_token') && response.data.access_token) {
                resolve(response.data)
            } else {
                // otherwise get a new token
                getNewToken(resolve, reject);
            }

        }).catch(err => {
            console.error(err);
            //DB error, so we need a new token
            getNewToken(resolve, reject)
        });


    })
}