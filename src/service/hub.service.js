import axios from 'axios';

const API_URL = 'http://localhost:5105/ProxyServer';

class HubService {
    async getStruct() {
        const json = {
            act: {
                A: "GetStruct",
            }
        }
        return axios
            .get(API_URL + "?jsonString=" + JSON.stringify(json) + "&sessionCookie=" + localStorage.getItem('sessionCookie'),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            .then(response => {
                if (response.data.SResult.C == 0)
                    var jsonObj = JSON.parse(response.data.SResult.D);
                return jsonObj;
            }).catch(error => {
                console.log(error)
            });
    }

    getStats() {
        const json = {
            act: {
                A: "GetStats",
            }
        }
        return axios
            .get(API_URL + "?jsonString=" + JSON.stringify(json) + "&sessionCookie=" + localStorage.getItem('sessionCookie'),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            .then(response => {
                return response.data;
            });
    }
}

export default new HubService();