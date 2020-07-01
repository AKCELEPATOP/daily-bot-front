<template>
    <v-col sm="6" md="4" lg="4" class="task-wrapper">
        <v-card color="primary" class="task-column">
            <v-list-item class="task-column-header">
                <v-list-item-content>
                    <v-list-item-title class="headline white--text">{{title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                    v-infinite-scroll="loadNext"
                    infinite-scroll-disabled="allowLoad"
                    infinite-scroll-distance="10"
                    class="task-list">
                <v-list-item-content>
                    <v-row v-if="loaded" dense>
<!--                        <container-->
<!--                                group-name="tasks"-->
<!--                                @drop="handleDrop"-->
<!--                                :get-child-payload="getCardPayload"-->
<!--                        >-->
<!--                            <draggable-->
<!--                                    v-for="task in ownTasks"-->
<!--                                    :key="task.id"-->
<!--                            >-->
<!--                                <task-card :task="task" />-->
<!--                            </draggable>-->
<!--                        </container>-->
                        <task-card
                                v-for="task in ownTasks"
                                :task="task"
                                :key="task.id"
                        />
                    </v-row>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import TaskCard from "./TaskCard";
    import { Container, Draggable } from "vue-smooth-dnd";

    export default {
        name: "TaskList",
        components: {
            TaskCard,
            // eslint-disable-next-line vue/no-unused-components
            Container,
            // eslint-disable-next-line vue/no-unused-components
            Draggable,
        },
        props: {
            groupId: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            }
        },
        data: () => ({
            loaded: false,
            busy: false,
        }),
        computed: {
            ...mapGetters('task', ['tasks', 'meta', 'isLocked']),
            allowLoad() {
                const meta = this.meta(this.groupId);
                return !this.loaded || this.busy || this.isLocked || (meta ? meta.totalPages <= +meta.currentPage : false);
            },
            ownTasks(){
                return this.tasks(this.groupId)
            }
        },
        methods: {
            ...mapActions('task', ['loadTasks']),
            async loadNext() {
                this.busy = true;
                await this.loadTasks({groupId: this.groupId});
                this.busy = false;
            },
            handleDrop(){

            },
            getCardPayload(index){
                return this.ownTasks[index];
            }
        },
        async mounted() {
            await this.loadTasks({groupId: this.groupId});
            this.loaded = true;
        },
    }
</script>

<style scoped lang="sass">
    .task-wrapper
        height: 100%

    .task-column
        position: relative
        display: flex
        flex-direction: column
        max-height: 100%

    .task-column-header
        position: relative
        flex: 0 0 auto

    .task-list
        flex: 1 1 auto
        overflow-y: auto
        display: inline-block

    .task-list::-webkit-scrollbar-track
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
        border-radius: 10px
        background-color: #F5F5F5

    .task-list::-webkit-scrollbar
        width: 8px

    .task-list::-webkit-scrollbar-thumb
        border-radius: 10px
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
        background-color: #555
</style>