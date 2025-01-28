import axios from "axios";
import { useCallback, useState } from "react";
import { getItem } from "../helpers/utils/localStorage";

const useFetchAPI = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fecthCall = useCallback(async (method = 'GET', body = null) => {
        try {
            setLoading(true);
            const token = getItem('token');
            const response = await axios({
                url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
                method: method,
                data: body,
                headers: {
                    Authorization: token
                }
            });
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.data);
                return response.data.data;
            }
        } catch (error) {
            console.log("Error : ", error);
            setError(error.response);
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }

    }, [url]);
    return [data, loading, error, fecthCall]
}

export default useFetchAPI;