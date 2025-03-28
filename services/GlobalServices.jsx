// import axios from "axios";

// // export const getToken=async()=>{
// //     const result = await axios.get('/api/getToken');
// //     return result.data
// // }

// export const getToken = async () => {
//     console.log('getToken() called'); 
//     try {
//         const result = await axios.get('/api/getToken');
//         console.log('Token response:', result); 
//         console.log('Token received:', result.data);
//         return result.data;
//     } catch (error) {
//         console.error('Error fetching token:', error);
//         throw error;
//     }
// };

import axios from "axios";

export const getToken = async () => {
    console.log('getToken() called');
    try {
        const result = await axios.get('/api/getToken');
        console.log('Token response:', result);
        console.log('Token received:', result.data.token);
        return result.data.token;
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        throw error;
    }
};