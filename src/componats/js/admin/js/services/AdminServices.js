import axiosInstance from "./StudentAuthServices"
//get admin//////
export const getAdminData=async(AdminId)=>{
    try {
        const response = await axiosInstance.get('/admin/getAdmin/'+AdminId)
        return response;
    } catch (error) {
        return error;
    }
}
/////get admin profile/////
export const getAdminPicture=async(AdminId)=>{
  try {
   const response =await axiosInstance.get('/admin/getAdminPicture/'+AdminId);
   return response;
  } catch (error) {
    return error;
  }
}
/////setAdmin update//////
export const setAdmin = async (adminId, formData) => {
    try {
      
      const response = await axiosInstance.put('/admin/updateAdmin/'+adminId, formData);
    
      if (response.status === 200) {
        return response; // Return the response on success
      } else {
        throw new Error(`Admin update failed with status: ${response.status}`);  // Throw custom error on failure
      }
    } catch (error) {
      console.error('Error updating admin:', error); // Log the error details
      throw error; // Re-throw the error for handling in the calling component
    }
  };
  /// reset Admin Password////////

  export const resetPassword = async (email, currentPassword, newPassword) => {
    try {
        const response = await axiosInstance.put('/admin/resetPassword', {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword
        });

        // Check if the response status is OK (200)
        if (response.status === 200) {
            // Password reset successfully
            return 'Password reset successfully';
        } else {
            // Password reset failed, handle error
            throw new Error('Failed to reset password');
        }
    } catch (error) {
        // An error occurred during the password reset process
        console.error('Error resetting password:', error);
        throw new Error('An error occurred while resetting the password.');
    }
};

  