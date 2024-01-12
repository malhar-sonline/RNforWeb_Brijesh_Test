export const BASE_URL = 'http://localhost:3001';

export const BaseSettings = {
  baseUrl: BASE_URL,
  api: BASE_URL,
  // endpoints: {
  //   login: BASE_URL + '/login',
  //   getItemList: BASE_URL + '/items',
  //   getItemDetails: id => `${BASE_URL}/items/${id}`,
  //   createItem: BASE_URL + '/items',
  //   updateItem: id => `${BASE_URL}/items/${id}`,
  //   deleteItem: id => `${BASE_URL}/items/${id}`,
  // },
  endpoints: {
    login: '/login',
    getItemList: '/items',
    getItemDetails: id => `/items/${id}`,
    createItem: '/items',
    updateItem: id => `/items/${id}`,
    deleteItem: id => `/items/${id}`,
  },
};
