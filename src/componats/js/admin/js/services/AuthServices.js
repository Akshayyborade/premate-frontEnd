import axios from "axios";

const getLoginUrl = (loginType) => {
    switch (loginType) {
        case 'teacher':
            return 'http://localhost:9095/api/auth/adminLogin';
        case 'student':
            return '/api/auth/student-login';
        case 'admin':
            return 'http://localhost:9095/api/auth/adminLogin';
        default:
            console.error('Invalid login type');
            return '';
    }
};
export const adminlogin = async (type, email, password) => {
    try {
        const response = await axios.post(getLoginUrl(type), { email, password });
        console.log("response", response);
        return response;
    } catch (error) {
        console.error("Error occurred during login:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};
//is loggied in
export const isLoggedIn = () => {
    let data  = localStorage.getItem('userData');
    if (!data){
        return false;
        }else{
            return true;
            }
}

//dologin
export const doLogin = (data, next) => {
    console.log(data);
    localStorage.setItem('userData', JSON.stringify(data.admin));//save admin data
    localStorage.setItem('token', data.jwtToken); // Save the token to local storage
    localStorage.setItem('adminId', data.admin.institutionId);//save admin id
    next();
}

//dologout
export const doLogOut = (next) => {
    localStorage.removeItem('userData');
    
    next();


}

//get user data
export const getUserData = () => {
  if(isLoggedIn){
    return JSON.parse(localStorage.getItem('userData'));
  }else{
    return false;
  }

}
 // Assuming you're using Axios for API calls

const API_URL = 'http://localhost:9095/api'; // Replace with your actual API endpoint

export const updateAdminProfile = async (adminData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/profile`, adminData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your authorization header logic
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for handling in the component
  }
};

export const changeAdminPassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.put(`${API_URL}/admin/password`, {
      currentPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your authorization header logic
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for handling in the component
  }
};
