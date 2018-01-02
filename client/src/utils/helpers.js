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

export function authUser() {
    return new Promise((resolve, reject) => {
        axios.get('/auth/twitter').then(response => {
            resolve(response.data);
        }).catch(err => {
            console.error({ twitterAuthErr: err })
            if (err) reject(err);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
}

export function unAuthUser() {
    return new Promise((resolve, reject) => {
        axios.post('/auth/logout').then(response => {
            resolve(response.data);
        }).catch(err => {
            reject({ title: 'Error', message: err.message });
        });
    });
}

export function getYelpToken() {

    function getNewToken(success, failure) {
        //get new yelp token
        axios.get('/auth/newYelpToken')
            .then(response => success(response.data))
            .catch(err => failure({ title: 'Error', message: err.message }))

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
            console.error({ helperError: err, location: 'getYelpToken' });
            //DB error, so we need a new token
            getNewToken(resolve, reject)
        });


    })
}

export function getYelpResults(geolocated, location, access_token) {
    return new Promise((resolve, reject) => {
        if (geolocated) {
            location = JSON.stringify(location);
        }
        axios.get(`/search/locations/${encodeURIComponent(location)}/${access_token}?geolocated=${geolocated}`).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.error({ helperError: err, location: 'getYelpResults' });
            reject({ title: 'Error', message: err.message });
        })

    });
}