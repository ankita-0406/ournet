import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function eventsReducer(state = initialState.Events, action) {

    switch (action.type) {
        case ActionTypes.LOAD_EVENTS:
                return update(state, { events: { $set: action.data.events }, itemsPerPage: { $set: action.data.itemsPerPage }, totalEvents: { $set: action.data.totalEvents } }); 
        default:
            return state;
    }

}