<template>
    <board v-show="loaded" />
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Board from "@/components/task/Board";


    export default {
        name: 'Home',
        data: () => ({
           loaded: false,
        }),
        components: {
            Board,
        },
        async created() {
            await this.loadProfile();
            this.loaded = true;
        },
        computed: {
            ...mapGetters('profile', ['profile']),
        },
        methods: {
            ...mapActions('profile', ['loadProfile']),
        },
    }
</script>