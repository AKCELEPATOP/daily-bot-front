<template>
    <section>
        <v-snackbar
                v-model="snackbar"
                :color="color"
                :timeout="timeout"
                right
                top
                multi-line
        >
            {{ text }}
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <slot/>
    </section>
</template>

<script>
    export default {
        name: "ErrorBoundary",
        data: () => ({
            timeout: 3000,
            text: null,
            snackbar: false,
        }),
        computed: {
            color() {
                return 'red';
            }
        },
        errorCaptured(err) {
            if (!err.response || err.response.status !== 401) {
                this.text = err.message;
                this.snackbar = true;
            }

            return false;
        }
    }
</script>

<style scoped>

</style>