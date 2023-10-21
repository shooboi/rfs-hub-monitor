<script>
import { createRouter, createWebHistory } from 'vue-router'
import HubDashboard from './components/HubDashboard.vue'
import LoginComponent from "./components/account/Login.vue";
import ChangePassword from "./components/account/ChangePassword.vue";
import HelloWorld from './components/HelloWorld.vue';
import { useStore } from 'vuex';
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
router.beforeEach(async (to, from, next) => {
    const store = useStore();
    const publicPages = ['/account/login',];
    const authRequired = !publicPages.includes(to.path);
    // const loggedIn = localStorage.getItem('user');
    // const loggedIn = store.state.auth.status.loggedIn

    const isSignIn = await store.dispatch('auth/getLoginInfo').then(result => {
        return result;
    })
    if (authRequired && !isSignIn) {
        console.log("not login")
        next('/account/login');
    } else {
        next();
    }
    // trying to access a restricted page + not logged in
    // redirect to login page

});

export default router

</script>