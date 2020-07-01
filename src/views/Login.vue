<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Daily bot</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert
                                outlined
                                type="warning"
                                prominent
                                v-if="errorMsg"
                        >
                            {{errorMsg}}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex align-center>
                            <v-btn color="primary" @click="authenticate('slack')">Авторизоваться через Slack</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: "Login",
        data: () => ({
            errorMsg: null
        }),
        methods: {
            ...mapMutations('profile', ['setAuthenticated']),
            async authenticate(provider) {
                this.errorMsg = null;
                try {
                    await this.$auth.authenticate(provider);
                } catch (e) {
                    if (e.message === 'Auth popup window closed') {
                        return;
                    }

                    if (e.response.status === 404 && e.response.data.message) {
                        this.errorMsg = e.response.data.message;
                        return;
                    }

                    throw e;
                }

                this.setAuthenticated(true);
                await this.$router.push({name: 'home'});
            }
        }
    }
</script>

<style scoped>

</style>