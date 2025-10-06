export const useHttp = () => {
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            console.log(url);
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            return data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    };

    return {request}
}