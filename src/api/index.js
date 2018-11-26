import axios from 'axios';

const baseURL = 'https://us-central1-todo-restful.cloudfunctions.net/'

export default {
  changeTodoState: function(data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.patch(baseURL + 'todos/' + data.id, data)
    .then((response) => {
      console.log(response)
      return response
    })
  },
  delete: function (data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.delete(baseURL + 'todos/' + data.id, data)
    .then((response) => {
      console.log(response)
    })
  },
  update: function (data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.put(baseURL + 'todos/' + data.id, data)
    .then((response) => {
      console.log(response)
    })
  },
  insert: function (data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.post(baseURL + 'todos', data)
    .then((response) => {
      console.log(response)
      return response
    })
  },
  select: function(authToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return axios.get(baseURL + 'todos')
      .then((response) => {
        return response
    })
  },
  authorize: function (userId, userPassword) {
    return axios.post(baseURL + 'authorize', {"id" : userId, "password" : userPassword })
      .then((response) => {
        localStorage.setItem('authToken', response.data.token);
        return response
    })
  }
};
