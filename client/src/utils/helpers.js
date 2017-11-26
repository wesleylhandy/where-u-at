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
    return new Promise((resolve, reject) => {
        axios.get('/auth/getYelpToken').then(response=>{
            //if token exists - send it back to app
            if(response && response.data && response.data.hasOwnProperty('access_token') && response.data.access_token) {
                resolve(response.data)
            } else {
                // otherwise get a new token
                getNewToken(resolve, reject);
            }
            
        }).catch(err=> getNewToken(resolve, reject)); //DB error, so we need a new token
        
        function getNewToken(success, failure) {
            //get new yelp token
            axios.post('https://api.yelp.com/oauth2/token', {grant_type: "client_credentials", client_id: process.env.YELP_CLIENT_ID, client_secret: process.env.YELP_CLIENT_SECRET},
                {
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                        'Accept': 'application/json',
    'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    responseType: 'json'
            })
            .then(response => {
                //store the token in DB
                axios.post('/auth/storeYelpToken', 
                    {
                        token_type: response.data.token_type, 
                        access_token: response.data.access_token,
                        expires_in: response.data.expires_in 
                    })
                .then(res=>{
                    // now send token to front-end, even if you can't save it
                    success(response.data.access_token);
                }).catch(err=> success(response.data.access_token))
            }).catch(err=> failure(err));
        }
    })
}