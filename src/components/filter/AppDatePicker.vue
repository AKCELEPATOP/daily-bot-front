<template>
    <v-menu
            :close-on-content-click="false"
            v-model="active"
            offset-y
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    :value="formattedDate"
                    :label="label"
                    @click:clear="handleSelect(null)"
                    prepend-icon="mdi-calendar"
                    readonly
                    clearable
                    v-on="on"
                    hide-details
            ></v-text-field>
        </template>
        <v-date-picker
                v-model="date"
                locale="ru-ru"
                :first-day-of-week="1"
                :max="(new Date()).toISOString()"
                no-title
                scrollable
        >
            <v-spacer></v-spacer>
            <v-btn
                    text
                    color="primary"
                    @click="active = false"
            >Отмена
            </v-btn>
            <v-btn
                    text
                    color="primary"
                    @click="handleSelect(date)"
            >OK
            </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "AppDatePicker",
        props: {
            value: String,
            label: {
                type: String,
                required: true,
            }
        },
        data: () => ({
            active: false,
            date: null
        }),
        computed: {
            formattedDate() {
                return this.value ? moment(this.value).format('DD.MM.YYYY') : '';
            }
        },
        methods: {
            handleSelect(e) {
                this.active = false;
                if(e !== this.value){
                    this.$emit('select', e);
                }
            }
        }
    }
</script>

<style scoped>

</style>