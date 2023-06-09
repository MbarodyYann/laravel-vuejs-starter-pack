import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import Meta from 'vue-meta'
import store from "../store";
import { sync } from 'vuex-router-sync'

import * as middlewares from '../middleware/index.js';

Vue.use(Router)
Vue.use(Meta)

// The middleware for every page of the application.
const globalMiddleware = ['locale', 'checkAuth']

// Load middleware modules dynamically.
//const routeMiddleware = await resolveMiddleware();

// async function resolveMiddleware() {
//     const middleware = {};
//     for (const file of Object.keys(import.meta.glob('../middleware/*.js'))) {
//         const name = file.replace(/(^..\/middleware\/)|(\.js$)/g, '');
//         middleware[name] = (await import(file)).default;
//     }
//
//     return middleware;
// }

//console.log(routeMiddleware)


const router = createRouter()

sync(store, router)

export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function createRouter () {
    const router = new Router({
        scrollBehavior,
        mode: 'history',
        routes
    })

    router.beforeEach(beforeEach)
    router.afterEach(afterEach)

    return router
}

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach (to, from, next) {
    let components = []

    try {
        // Get the matched components and resolve them.
        components = await resolveComponents(
            router.getMatchedComponents({ ...to })
        )
    } catch (error) {
        if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
            window.location.reload(true)
            return
        }
    }

    if (components.length === 0) {
        return next()
    }

    // Start the loading bar.
    if (components[components.length - 1].loading !== false) {
        // router.app.$nextTick(() => router.app.$loading.start())
    }

    // Get the middleware for all the matched components.
    const middleware = getMiddleware(components)

    // Load async data for all the matched components.
    await asyncData(components)

    // Call each middleware.
    callMiddleware(middleware, to, from, (...args) => {
        // Set the application layout only if "next()" was called with no args.
        if (args.length === 0) {
            // router.app.setLayout(components[0].layout || '')
        }

        next(...args)
    })
}

/**
 * @param  {Array} components
 * @return {Promise<void>
 */
async function asyncData (components) {
    for (let i = 0; i < components.length; i++) {
        const component = components[i]

        if (!component.asyncData) {
            continue
        }

        const dataFn = component.data

        try {
            const asyncData = await component.asyncData()

            component.data = function () {
                return {
                    ...(dataFn ? dataFn.apply(this) : {}),
                    ...asyncData
                }
            }
        } catch (e) {
            component.layout = 'error'

            console.error('Failed to load asyncData', e)
        }
    }
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach (to, from, next) {
    await router.app.$nextTick()

    // router.app.$loading.finish()
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function callMiddleware (middleware, to, from, next) {
    const stack = middleware.reverse()
    const routeMiddleware = middlewares
    const _next = (...args) => {
        // Stop if "_next" was called with an argument or the stack is empty.
        if (args.length > 0 || stack.length === 0) {
            if (args.length > 0) {
                // router.app.$loading.finish()
            }

            return next(...args)
        }

        const { middleware, params } = parseMiddleware(stack.pop())

        if (typeof middleware === 'function') {
            middleware(to, from, _next, params)
        } else if (routeMiddleware[middleware]) {
            routeMiddleware[middleware](to, from, _next, params)
        } else {
            throw Error(`Undefined middleware [${middleware}]`)
        }
    }

    _next()
}

/**
 * @param  {String|Function} middleware
 * @return {Object}
 */
function parseMiddleware (middleware) {
    if (typeof middleware === 'function') {
        return { middleware }
    }

    const [name, params] = middleware.split(':')

    return { middleware: name, params }
}

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Array}
 */
function resolveComponents (components) {
    return Promise.all(components.map(component => {
        return typeof component === 'function' ? component() : component
    }))
}

/**
 * Merge the the global middleware with the components middleware.
 *
 * @param  {Array} components
 * @return {Array}
 */
function getMiddleware (components) {
    const middleware = [...globalMiddleware]

    components.filter(c => c.middleware).forEach(component => {
        if (Array.isArray(component.middleware)) {
            middleware.push(...component.middleware)
        } else {
            middleware.push(component.middleware)
        }
    })

    return middleware
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }

    if (to.hash) {
        return { selector: to.hash }
    }

    const [component] = router.getMatchedComponents({ ...to }).slice(-1)

    if (component && component.scrollToTop === false) {
        return {}
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ x: 0, y: 0 })
        }, 190)
    })
}