import axios from 'axios';

export default axios.create({
    baseURL : 'http://localhost:3500' //change this when the project goes live
});

