const apiHost = 'https://api.massrelevance.com/MassRelDemo/kindle.json';

const options = {
    method: 'GET',
    mode: 'cors',
}
  
export default {
    async fetchMessages(limit){
        try {
            let response = await fetch(`${apiHost}?limit=${limit}`, options);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
    }
}