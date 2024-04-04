import axiosInstance from "./StudentAuthServices"

export const getAdminData=async(AdminId)=>{
    try {
        const response = await axiosInstance.get('/admin/getAdmin/'+AdminId)
        return response;
    } catch (error) {
        return error;
    }
}