<template>
    <v-expansion-panels>
        <v-expansion-panel
        >
            <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                    <v-col cols="2">Фильтры</v-col>
                    <v-col
                            cols="10"
                            class="text--secondary"
                    >
                        <v-fade-transition leave-absolute>
                            <v-row
                                    v-if="!open"
                                    no-gutters
                                    style="width: 100%"
                            >
                                <v-col
                                        cols="4"
                                        v-if="isDisplayName"
                                >
                                    Пользователь: {{ displayName     }}
                                </v-col>
                                <v-col
                                        cols="4"
                                        v-if="filters.dateFrom"
                                >
                                    Начало периода: {{ dateFrom }}
                                </v-col>
                                <v-col
                                        cols="4"
                                        v-if="filters.dateTo"
                                >
                                    Конец периода: {{ dateTo }}
                                </v-col>
                            </v-row>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row
                        justify="space-around"
                        no-gutters
                >
                    <v-col cols="4">
                        <v-checkbox
                                v-model="self"
                                label="Отображать только мои"
                                hide-details
                        />
                        <user-autocomplete
                                :user="user"
                                :name="userName"
                                @select="userSelected"
                        />
                    </v-col>
                    <v-col
                            cols="3"
                            align-self="end"
                    >
                        <app-date-picker
                                :value="filters[this.filterNames.FILTER_DATE_FROM]"
                                label="Начало периода"
                                @select="dateFromSelected"
                        />
                    </v-col>

                    <v-col
                            cols="3"
                            align-self="end"
                    >
                        <app-date-picker
                                :value="filters[this.filterNames.FILTER_DATE_TO]"
                                label="Конец периода"
                                @select="dateToSelected"
                        />
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import UserAutocomplete from "./UserAutocomplete";
    import AppDatePicker from "./AppDatePicker";
    import {TASK_FILTERS} from "../../modules/filter/constants";
    import ProfileService from "../../services/profile";
    import moment from "moment";

    export default {
        name: "TaskFilterTooltip",
        components: {AppDatePicker, UserAutocomplete},
        props: {
            filters: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            date: null,
            filterNames: TASK_FILTERS,
            userName: null,
        }),
        async created() {
            const user = this.filters[this.filterNames.FILTER_USER_ID];
            if (user) {
                const {data} = await ProfileService.getUser(user);
                this.userName = data.realName;
            }
        },
        computed: {
            dateFrom() {
                return this.filters.dateFrom ? moment(this.filters.dateFrom).format('DD.MM.YYYY') : '';
            },
            dateTo() {
                return this.filters.dateTo ? moment(this.filters.dateTo).format('DD.MM.YYYY') : '';
            },
            user() {
                const user = this.filters[this.filterNames.FILTER_USER_ID];
                return user ?
                    {id: user, realName: this.userName} :
                    null;
            },
            displayName() {
                return this.filters[this.filterNames.FILTER_USER_ID] ? this.userName : 'Вы';
            },
            isDisplayName() {
                return this.filters[this.filterNames.FILTER_USER_ID] || this.filters[this.filterNames.FILTER_SELF];
            },
            self: {
                get(){
                    return this.filters[this.filterNames.FILTER_SELF];
                },
                set(value){
                    this.selfSelected(value);
                }
            }
        },
        methods: {
            userSelected(value) {
                if (value) {
                    this.userName = value.realName;
                    value = value.id;
                } else {
                    this.userName = null;
                }
                /** @type FilterChangedEvent[] */
                const filtersForUpdate = [{field: this.filterNames.FILTER_USER_ID, value}];
                /** При выборе пользователя нужно убирать флаг self */
                if (this.filters[this.filterNames.FILTER_SELF]) {
                    filtersForUpdate.push({field: this.filterNames.FILTER_SELF, value: null})
                }

                this.filtersSelected(...filtersForUpdate);
            },
            selfSelected(value) {
                /** @type FilterChangedEvent[] */
                const filtersForUpdate = [{field: this.filterNames.FILTER_SELF, value}];
                if (this.filters[this.filterNames.FILTER_USER_ID]) {
                    filtersForUpdate.push({field: this.filterNames.FILTER_USER_ID, value: null});
                }
                this.filtersSelected(...filtersForUpdate);
            },
            dateFromSelected(value) {
                /** @type FilterChangedEvent[] */
                const filtersForUpdate = [{field: this.filterNames.FILTER_DATE_FROM, value}];
                if (value > this.filters[this.filterNames.FILTER_DATE_TO]) {
                    filtersForUpdate.push({field: this.filterNames.FILTER_DATE_TO, value});
                }
                this.filtersSelected(...filtersForUpdate);
            },
            dateToSelected(value) {
                /** @type FilterChangedEvent[] */
                const filtersForUpdate = [{field: this.filterNames.FILTER_DATE_TO, value}];
                if (value < this.filters[this.filterNames.FILTER_DATE_FROM]) {
                    filtersForUpdate.push({field: this.filterNames.FILTER_DATE_FROM, value});
                }
                this.filtersSelected(...filtersForUpdate);
            },
            /**
             * @param {...FilterChangedEvent} filters
             */
            filtersSelected(...filters) {
                this.$emit('select', filters);
            }
        },
    }
</script>

<style scoped>

</style>