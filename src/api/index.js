import axios from 'axios';

const BASE_URL = 'https://us-central1-todo-restful.cloudfunctions.net/'

export default {
  changeTodoState: function(data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.patch(BASE_URL + 'todos/' + data.id, data)
    .then((response) => {
      console.log(response)
      return response
    })
  },
  delete: function (data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.delete(BASE_URL + 'todos/' + data.id, data)
    .then((response) => {
      console.log(response)
    })
  },
  update: function (data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.put(BASE_URL + 'todos/' + data.id, data)
    .then((response) => {
      console.log(response)
    })
  },
  insert: function (data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.post(BASE_URL + 'todos', data)
    .then((response) => {
      console.log(response)
      return response
    })
  },
  select: function(authToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.get(BASE_URL + 'todos')
      .then((response) => {
        return response
    })
  },
  authorize: function (userId, userPassword) {
    return axios.post(BASE_URL + 'authorize', {"id" : userId, "password" : userPassword })
      .then((response) => {
        localStorage.setItem('authToken', response.data.token);
        return response
    })
  }
};
