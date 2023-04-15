import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'

import auth from "./modules/auth";
import lang from "./modules/lang";


Vue.use(Vuex)

// async function autoImportModules() {
//     const storeModules = {}
//
//     const files = import.meta.glob('./modules/*.js')
//     const promises = []
//
//     for (const path in files) {
//         const name = path.slice(path.lastIndexOf('/') + 1, path.length - 3)
//         const promise = files[path]().then((module) => {
//             storeModules[name] = module.default || module
//         })
//         promises.push(promise)
//     }
//
//     await Promise.all(promises)
//
//     return storeModules
// }

const store = createStore(Vuex.Store, {
    modules: {
        auth: auth,
        lang: lang
    }
})

export default store