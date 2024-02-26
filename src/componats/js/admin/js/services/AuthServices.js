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
    localStorage.setItem('userData', JSON.stringify(data.admin));
    localStorage.setItem('token', data.token); // Save the token to local storage
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