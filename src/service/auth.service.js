import axios from 'axios';

const API_URL = 'http://localhost:5105/ProxyServer';
// const API_URL2 = 'http://test.stockprice.vn/Hub/Feeder.svc/S';


class AuthService {
    login(user) {
        const json = {
            act: {
                A: "LoginX",
                P: user.username + ";" + user.password
            }
        }
        return axios
            .get(API_URL + "?jsonString=" + JSON.stringify(json))
            .then(response => {
                console.log(response)
                if (response.data.SResult.C == 0) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('sessionCookie', 'ASP.NET_SessionId=gvcsg4ygu33gikshb0twi2nl');
                }
                return response.data;
            });
    }
    // login(user) {
    //     const act = {
    //         "A": "LoginX",
    //         "P": user.username + ";" + user.password
    //     }
    //     return axios
    //         .post(API_URL2, act, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //         })
    //         .then(response => {
    //             console.log(response.data.SResult.C);
    //             // if (response.data.accessToken) {
    //             //     localStorage.setItem('user', JSON.stringify(response.data));
    //             // }
    //             return response.data;
    //         });
    // }

    logout() {
        localStorage.removeItem('user');
    }

    register() {
        // return axios.post(API_URL + 'signup', {
        //     username: user.username,
        //     email: user.email,
        //     password: user.password
        // });
    }
}

export default new AuthService();