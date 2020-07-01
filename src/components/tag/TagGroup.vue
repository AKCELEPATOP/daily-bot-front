<template>
    <div class="overline">
        <tag
                v-for="tag in tagList"
                :code="tag.code"
                :key="tag.code"
        />
    </div>
</template>

<script>
    import Tag from "./Tag";
    export default {
        name: "TagGroup",
        components: {Tag},
        props: {
            tagList: {
                type: Array,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>