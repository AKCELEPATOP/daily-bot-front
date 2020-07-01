<template>
    <div id="nav">
        <v-app-bar
                color="primary"
                dense
                dark
                v-if="isAuthenticated"
        >
            <!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <v-toolbar-title>Daily bot</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
                    text
                    @click="logout"
            >
                <span>Выход</span>
                <v-icon right>
                    mdi-login-variant
                </v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';

    export default {
        name: "Navbar",
        methods: {
            ...mapMutations('profile', ['setAuthenticated']),
            ...mapActions('profile', {
                storeLogout: 'logout'
            }),
            logout() {
                this.$auth.logout();
                this.storeLogout();
                this.$router.push({name: 'login'});
            },
        },
        computed: {
            ...mapGetters('profile', ['isAuthenticated'])
        },
        created() {
            this.setAuthenticated(this.$auth.isAuthenticated());
        }
    }
</script>

<style scoped>

</style>