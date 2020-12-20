import {URL_API} from '../../../utils/configApp';

const category = '/api/category';
export const categoryRequest = () => ({
  method: 'GET',
  url: `${URL_API}${category}`,
});
