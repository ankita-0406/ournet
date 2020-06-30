import * as ActionTypes from './actionTypes';
import * as api from '../api/EventApi';

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function getEvents(pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getEvents(pageIndex, pageSize, filter).then(events => {
            events = events || {};
            events.itemsPerPage = pageSize;
            dispatch(loadReducer(ActionTypes.LOAD_EVENTS, events));
            return events;
        })
    };
}

export function getEventsGuest(lat, lng, radius, pageIndex, pageSize) {
    return function (dispatch) {
        return api.getEventsGuest(lat, lng, radius, pageIndex, pageSize).then(events => {
            events = events || {};
            events.itemsPerPage = pageSize;
            dispatch(loadReducer(ActionTypes.LOAD_EVENTS, events));
            return events;
        })
    };

}

export function getEventsForum(eventId) {
    return function (dispatch) {
        return api.getEventsForum(eventId) .then(forums => {
            forums = forums || {};
            return forums;
        })
    };
}

export function getEventTopicComment(eventTopicId){

    return function (dispatch) {
        return api.getEventTopicComment(eventTopicId).then(comment => {
            comment = comment || {};
            return comment;
        })
    };

}

export function postEvent(data) {
    return function (dispatch) {
        return api.postEvent(data).then(events => {
            events = events || {};
            return events;
        })
    };
}

export function postEventComment(data) {
    return function (dispatch) {
        return api.postEventComment(data).then(comment => {
            comment = comment || {};
            return comment;
        })
    };
}

export function publishEvent(data) {
    return function (dispatch) {
        return api.publishEvent(data).then(events => {
            events = events || {};
            return events;
        })
    };
}

