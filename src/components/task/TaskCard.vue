<template>
    <v-col cols="12" class="task-card">
        <v-card
                class="mx-auto"
                max-width="344"
        >
            <v-list-item class="pt-1">
                <v-list-item-content class="text-left pa-0">
                    <div class="id-box overline mb-1 indigo--text">{{idString}}</div>
                    <v-list-item-title class="mb-1 task-title">{{task.title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-card-actions class="task-actions">
                <v-row no-gutters>
                    <v-col align="start">
                        <tag-group
                                :tag-list="task.tags"
                        />
                    </v-col>
                    <v-col md="auto" align="center"
                           justify="end"
                    >
                            <span class="task-actions-owner subheading">{{task.user.realName}}</span>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    import TagGroup from "@/components/tag/TagGroup";
    export default {
        name: "TaskCard",
        components: {TagGroup},
        props: {
            task: {
                type: Object
            }
        },
        computed: {
            idString() {
                return `#${this.task.id}`;
            }
        }
    }
</script>

<style scoped lang="sass">
    .task-card
        user-select: none

    .task-title
        white-space: pre-line

    .task-actions
        padding: 0 5px 5px 16px

    .task-actions-owner
        font-size: .875rem
        font-weight: 400
        color: rgba(0, 0, 0, .6)

    .id-box
        font-weight: 800
</style>