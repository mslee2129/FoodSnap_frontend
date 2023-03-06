const prod = {
    url: {
        API_URL: 'https://foodsnap-backend-qstt5gdgeq-nw.a.run.app'
    }
};
const dev = {
    url: {
        // API_URL: 'http://127.0.0.1:5000'
        API_URL: 'https://foodsnap-backend-qstt5gdgeq-nw.a.run.app'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;