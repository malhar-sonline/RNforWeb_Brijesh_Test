import axios from 'axios';
import {BASE_URL} from './BaseSettings';
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});

export const axiosApi = (method, url, data, headers) => {
  return new Promise((resolve, reject) => {
    instance
      .request({
        method,
        url,
        data,
        headers,
      })
      .then(response => {
        resolve(response?.data);
      })
      .catch(err => {
        console.log('🚀 ~ returnnewPromise ~ err:', err);
        reject(err);
      });
  });
};

export const fetchApi = (method, url, data, headers) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: method,
      headers: {'Content-Type': 'application/json', ...headers},
    };

    if (method !== 'get') {
      options.body = JSON.stringify(data);
    }

    fetch(BASE_URL + url, options)
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log('🚀 ~ Promise ~ err:', err);
        reject(err);
      });
  });
};
