import axios from 'axios';
import baseUrl from '../constants/copnstant';

const instance = axios.create({
  baseURL: baseUrl,
});
export default instance;
