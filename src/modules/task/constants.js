'use strict';

/** @type TaskGroup[] */
export const groups = [
    {
        active: true,
        title: 'Активные',
    },
    {
        active: false,
        title: 'Завершенные',
    }
];

export const dateFilters = [
    'dateFrom', 'dateTo'
];

/**
 * @typedef TaskGroup
 * @global
 * @property {string} title
 * @property {boolean} active
 */