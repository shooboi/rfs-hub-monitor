<script>
import { createRouter, createWebHistory } from 'vue-router'
import HubDashboard from './components/HubDashboard.vue'
import LoginComponent from "./components/account/Login.vue";
import ChangePassword from "./components/account/ChangePassword.vue";

import HelloWorld from './components/HelloWorld.vue';
const routes = [
    {
        path: "/",
        component: HelloWorld
    },
    {
        path: "/dashboard",
        component: HubDashboard
    },
    {
        path: "/account/login",
        component: LoginComponent
    },
    {
        path: "/account/changepwd",
        component: ChangePassword
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach((to, from, next) => {
    const publicPages = ['/account/login',];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/account/login');
    } else {
        next();
    }
});
export default router

</script>