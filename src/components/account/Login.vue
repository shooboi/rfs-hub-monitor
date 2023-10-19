<template>
    <div class="flex justify-center p-11 h-screen space-y-11">
        <div class="w-96 p-6">
            <h1 class="text-3xl block text-center font-semibold">Login</h1>
            <hr class="mt-3">
            <div class="mt-3">
                <label for="username" class="block text-base mb-2">Username: </label>
                <input
                    class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 rounded-lg focus:border-gray-600"
                    id="username" v-model="user.username" type="text" />
            </div>
            <div>
                <label for="password" class="block text-base mb-2">Password: </label>
                <input id="password"
                    class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 rounded-lg focus:border-gray-600"
                    v-model="user.password" type="password" />
            </div>
            <div class="mt-5">
                <button @click="handleLogin"
                    class="border-2 border-indigo-600 bg-indigo-600 text-white py-2 px-8 rounded-xl"
                    type="button">Login</button>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "LoginComponent",
    data() {
        return {
            user: {},
            loading: false,
            message: "",
            // schema,
        };
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/dashboard");
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        handleLogin(user) {
            this.loading = true;
            user = this.user;
            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$router.push("/dashboard");
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },

    },
}
</script>
