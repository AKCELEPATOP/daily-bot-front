'use strict';

import types from "./types";

const bindingKeys = new Set([
    'color',
    'text-color',
]);

const getBindings = (typeCode) => {
    const type = types[typeCode];
    return Object.keys(type)
        .filter(key => bindingKeys.has(key))
        .reduce((obj, key) => {
            obj[key] = type[key];
            return obj;
        }, {});
};

const getTitle = (typeCode) => {
    const {[typeCode]: {title}} = types;
    return title;
};


export default {
    /**
     * Возвращает объект с биндингами для тега
     *
     * @param {string} typeCode
     * @return {{}}
     */
    getBindings,
    /**
     * Возвращает заголовок тега
     *
     * @param {string} typeCode
     * @return {string}
     */
    getTitle,
}