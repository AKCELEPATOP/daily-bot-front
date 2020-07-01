<template>
    <v-container
            class="task-board-container"
            fill-height
            v-if="groups"
    >
        <task-filter-tooltip
                :filters="filters"
                @select="handleFiltersSelected"
        />
        <v-layout class="task-board-wrapper">
            <v-row class="task-board" fill-height>
                <task-list
                        v-for="group in groups"
                        :groupId="group.id"
                        :title="group.name"
                        :key="group.code"
                />
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    import TaskList from "../../components/task/TaskList";
    import TaskFilterTooltip from "../filter/TaskFilterTooltip";
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import {renderForUrl, parseFromUrl} from "../../modules/filter/utils";
    import {TASK_FILTERS} from "../../modules/filter/constants";

    export default {
        name: "Board",
        components: {TaskFilterTooltip, TaskList},
        computed: {
            ...mapGetters('task', ['filters']),
            ...mapGetters('taskGroup', ['groups'])
        },
        methods: {
            ...mapMutations('task', ['setFilter', 'updateFilters']),
            ...mapActions('task', ['updateFilters']),
            ...mapActions('taskGroup', ['loadGroups']),
            async handleFiltersSelected(filters) {
                const update = this.updateFilters(filters);
                await this.updateUrlFromFiltersChanged(filters);
                await update;
            },
            async updateUrlFromFiltersChanged(filters) {
                const {name, query} = this.$route;
                let newRoute = {name, query};
                filters.forEach(({field, value}) => {
                    if (value) {
                        newRoute.query = {...newRoute.query, [field]: renderForUrl({field, value})};
                    } else {
                        // eslint-disable-next-line no-unused-vars
                        const {[field]: deleted, ...oldParams} = newRoute.query;
                        newRoute.query = {...oldParams};
                    }
                });

                await this.$router.replace(newRoute);
            },
            loadFilters(){
                const available = Object.values(TASK_FILTERS);
                const filters = Object
                    .keys(this.$route.query)
                    .filter((field) => available.includes(field))
                    .map((field) => ({
                        field,
                        value: parseFromUrl({field, value: this.$route.query[field]}),
                    }));
                this.updateFilters(filters);
            }
        },
        async created() {
            const loadTask = this.loadGroups();
            this.loadFilters();
            await loadTask;
        }
    }
</script>
<style scoped lang="sass">
    .task-board-container
        flex-direction: column

        .task-board-wrapper
            height: auto !important
            position: relative
            width: 100%

        .task-board
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
</style>