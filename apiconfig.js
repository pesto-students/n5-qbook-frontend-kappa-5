import Axios from 'axios';

export default Axios.create({
    baseURL:"http://localhost:1337/api/v1/",
})