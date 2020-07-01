<template>
    <v-chip
            class="tag"
            v-bind="bindings"
            x-small
            label
    >
        {{title}}
    </v-chip>
</template>

<script>
    import utils from '../../modules/tag/utils';

    export default {
        name: "Tag",
        props: {
            code: {
                type: String,
                required: true,
            }
        },
        computed: {
            bindings() {
                return utils.getBindings(this.code);
            },
            title() {
                return utils.getTitle(this.code);
            }
        }
    }
</script>

<style scoped lang="sass">
    .tag
        padding-top: 8px
        padding-bottom: 8px
        font-weight: 700
</style>