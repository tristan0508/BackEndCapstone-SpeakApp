import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.get(url, body).then(responseBody),
    put: (url, body) => axios.get(url, body).then(responseBody),
    del: (url) => axios.get(url).then(responseBody),
    getAuth: (url, firebaseUserId, token) => axios.get(url, firebaseUserId, token)
    .then(responseBody)
};

const Messages = {
    list: (userId) => requests.get(`/messages/${userId}`)
}

const User = {
    user: (firebaseUserId, token) => requests.get(`/user/${firebaseUserId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const UserChat = {
    userChat: (token) => requests.get('/chat/', {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}
export default {
    Messages,
    User,
    UserChat
}