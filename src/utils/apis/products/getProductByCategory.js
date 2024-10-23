import apiClient from "../../../constants/axios-interceptor";

export const getProductByCategory = async (id)=>{
    try {
        return await apiClient.get(`/categories/${id}/products`)
    } catch (error) {
        return error
        
    }
}