import axios from 'axios';
import { doLogOut } from './AuthServices';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:9095/api', // Base URL of your backend API
  timeout: 5000, // Timeout duration
  
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization =`Bearer ${token}`;
      console.log (`token${token}`)
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
export const getStudents= async()=>{
 

  try{
    const response = await axiosInstance.get('/student/getAllStudent');
   
    const students =response;
    console.log('stud', students)
    return students;
  }catch(error){

  }


}
