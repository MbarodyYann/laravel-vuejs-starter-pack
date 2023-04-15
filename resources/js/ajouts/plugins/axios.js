import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import store from '../store'
import router from '../router'
import i18n from './i18n'

//axios.defaults.withCredentials = true

//Ok pour Z
// axios.interceptors.request.use(config => {
//     const token = store.getters['auth/token']
//     if (token) {
//         config.headers = {
//             ...config.headers,
//             Authorization: `Bearer ${token}`
//         }
//     }
//     config.headers = {
//         ...config.headers,
//         Accept: 'application/vnd.api+json',
//         'Content-Type': 'application/vnd.api+json'
//     }
//     return config
// })

//ok pou les 2
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        switch (error.response.status) {
            //case 401: // UNAUTHORIZED:
            case 419: //SESSION_EXPIRED:
                if (store.getters['auth/authenticated']) {
                    Swal.fire({
                        icon: 'warning',
                        title: i18n.t('token_expired_alert_title'),
                        text: i18n.t('token_expired_alert_text'),
                        reverseButtons: true,
                        confirmButtonText: i18n.t('ok'),
                        cancelButtonText: i18n.t('cancel')
                    }).then(() => {
                        store.commit('auth/LOGOUT')
                        router.push({ name: 'login' })
                    })
                }
                break
            case 500: //INTERNAL_SERVER_ERROR:
                alert(i18n.t('error_alert_text'))
                break
            default:
                return Promise.reject(error)
        }
    }
)
