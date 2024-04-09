import axiosInstance from "./StudentAuthServices"

export const getAdminData=async(AdminId)=>{
    try {
        const response = await axiosInstance.get('/admin/getAdmin/'+AdminId)
        return response;
    } catch (error) {
        return error;
    }
}
export const getAdminPicture=async(AdminId)=>{
  try {
   const response =await axiosInstance.get('/admin/getAdminPicture/'+AdminId);
   return response;
  } catch (error) {
    return error;
  }
}
export const setAdmin = async (adminId, formData, selectedFile) => {
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
  