import moment from "moment";
import {TASK_FILTERS} from "./constants";

const filtersUrlRender = {
};

const filtersRequestPrepare = {
    [TASK_FILTERS.FILTER_DATE_FROM]: (value) => moment(value).format(),
    [TASK_FILTERS.FILTER_DATE_TO]: (value) => moment(value).add(1, 'day').format(),
};

const filterUrlParsers = {
    [TASK_FILTERS.FILTER_USER_ID]: (value) => +value,
    [TASK_FILTERS.FILTER_SELF]: (value) => value === 'true' || null,
};

export const renderForUrl = ({field, value}) => {
    if (!filtersUrlRender[field]) {
        return value;
    }

    return filtersUrlRender[field](value);
};

export const renderForRequest = ({field, value}) => {
    if (!filtersRequestPrepare[field]) {
        return value;
    }

    return filtersRequestPrepare[field](value);
};

export const parseFromUrl = ({field, value}) => {
    if (!filterUrlParsers[field]) {
        return value;
    }

    return filterUrlParsers[field](value);
};
