import {URL_AUTHEN, URL_API} from '../../../utils/configApp';

const CoverData = data => {
  const formData = new FormData();
  const values = Object.values(data);
  const keys = Object.keys(data);
  for (let i = 0; i < values.length; i++) {
    //EX: phone ="098098098";
    formData.append(`${keys[i]}`, values[i]);
  }
  return formData;
};

const apiLogin = '/oauth/token';
export const loginRequest = (username, password) => ({
  method: 'POST',
  url: `${URL_AUTHEN}${apiLogin}`,
  data: CoverData({
    client_id: 'dev',
    client_secret: 'secret1',
    grant_type: 'password',
    username,
    password,
  }),
});

const apiRegister = '/api/users/register';
export const registerRequest = (username, name) => ({
  method: 'POST',
  url: `${URL_API}${apiRegister}`,
  data: {
    username,
    name,
  },
});

const apiLoginToken = '/api/users';
export const loginTokenRequest = () => ({
  method: 'GET',
  url: `${URL_API}${apiLoginToken}`,
});

const apiUpdateFcmToken = '/api/users/update-fcm-token';
export const updateFcmTokenRequest = fcmToken => ({
  method: 'POST',
  url: `${URL_API}${apiUpdateFcmToken}`,
  data: {
    fcmToken,
  },
});

const customers = '/api/customers';
export const customersRequest = () => ({
  method: 'GET',
  url: `${URL_API}${customers}`,
});

const info = '/api/staffs/info';
export const infoRequest = () => ({
  method: 'GET',
  url: `${URL_API}${info}`,
});
