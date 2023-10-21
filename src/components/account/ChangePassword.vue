<template>
    <div class="flex justify-center p-11 h-screen space-y-11">
        <div class="w-96 p-6">
            <h1 class="text-3xl text-center">Change Password</h1>
            <input type="text">
            <hr class="mt-3">
            <div class="mt-3">
                <label for="username" class="block text-base mb-2">Old password: </label>
                <input
                    class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 rounded-lg focus:border-gray-600"
                    id="username" type="text" />
            </div>
            <div>
                <label for="password" class="block text-base mb-2">New password: </label>
                <input id="password"
                    class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 rounded-lg focus:border-gray-600"
                    type="password" />
            </div>
            <div class="mt-5">
                <button class="border-2 border-indigo-600 bg-indigo-600 text-white py-2 px-8 rounded-xl"
                    type="button">Change</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChangePasswordComponent",

}
</script>

<style lang="scss" scoped></style>