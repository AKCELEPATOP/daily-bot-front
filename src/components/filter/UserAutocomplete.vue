<template>
    <v-autocomplete
            :value="user"
            @change="handleSelect"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            item-text="realName"
            flat
            hide-no-data
            hide-details
            clearable
            return-object
            label="Пользователь"
            prepend-icon="mdi-account-circle"
    ></v-autocomplete>
</template>

<script>
    import ProfileService from '../../services/profile';

    export default {
        name: "UserAutocomplete",
        props: {
            user: {},
            name: {
                type: String,
            },
        },
        data: () => ({
            loading: false,
            items: [],
            search: null,
        }),
        created() {
            this.search = this.name;
        },
        methods: {
            async querySelections(v) {
                this.loading = true;
                try {
                    const {data} = await ProfileService.getUsers({search: v});
                    this.items = data;
                } finally {
                    this.loading = false;
                }
            },
            handleSelect(e) {
                if (!e || +e.id !== +this.user) {
                    this.$emit('select', e);
                }
            }
        },
        watch: {
            search(val, oldVal) {
                val && val !== oldVal && this.querySelections(val)
            },
            user(val) {
                if (!val && this.search) {
                    this.search = null;
                }
            },
        }
    }
</script>

<style scoped>

</style>