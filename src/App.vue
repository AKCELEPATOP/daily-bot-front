<template>
    <v-app id="app">
        <error-boundary id="error-boundary">
            <navbar/>
            <v-content id="content">
                <router-view/>
            </v-content>
        </error-boundary>
    </v-app>
</template>

<script>
    import Navbar from "@/components/navbar/Navbar";
    import ErrorBoundary from "@/components/error/ErrorBoundary";

    export default {
        // eslint-disable-next-line vue/no-unused-components
        components: {ErrorBoundary, Navbar},
        errorCaptured(err) {
            console.log(err);
            return false;
        }
    }
</script>

<style scoped lang="sass">
    #app
        font-family: Avenir, Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50

    #error-boundary
        height: 100%
        display: flex
        flex-direction: column
</style>