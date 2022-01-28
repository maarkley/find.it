import config from '../config'
import axios from 'axios'

export function getNewMarkers() {
    return {
        type: 'GET_NEW_MARKERS'
    }
}

export function addItemFormUpdate(data) {
    return {
        type: 'ADD_ITEM_FORM_UPDATE',
        payload: data
    }
}

export function updateItemFormPlace(data) {
    return {
        type: 'ADD_ITEM_FORM_PLACE_UPDATE',
        payload: data
    }
}

export function addItem(data) {
    return {
        type: 'ADD_ITEM',
        payload: axios.post(config.apiEndpoint + '/reports', data)
    }
}

export function getAllReports() {
    return {
        type: 'GET_ALL_REPORTS',
        payload: axios.get(config.apiEndpoint + '/reports')
    }
}

export function addItemFormActivate() {
    return {
        type: 'ADD_ITEM_FORM_ACTIVATE'
    }
}

export function addItemFormDeactivate() {
    return {
        type: 'ADD_ITEM_FORM_DEACTIVATE'
    }
}

export function showMarkerInfoBox(id) {
    return {
        type: 'SHOW_MARKER_INFO_BOX',
        payload: id
    }
}

export function toggleMarkerInfoBox(id) {
    return {
        type: 'TOGGLE_MARKER_INFO_BOX',
        payload: id
    }
}

export function getReportBySlug(slug) {
    return {
        type: 'GET_REPORT_BY_SLUG',
        payload: axios.get(config.apiEndpoint + '/reports/' + slug)
    }
}

export function setCurrentReport(slug) {
    return {
        type: 'SET_CURRENT_REPORT',
        payload: slug
    }
}

export function clearCurrentReport() {
    return {
        type: 'CLEAR_CURRENT_REPORT'
    }
}

export function addMarkerModeOn() {
    return {
        type: 'ADD_MARKER_MODE_ON'
    }
}

export function addMarkerModeOff() {
    return {
        type: 'ADD_MARKER_MODE_OFF'
    }
}

export function clearAddMarkerPosition() {
    return {
        type: 'CLEAR_ADD_MARKER_POSITION'
    }
}


export function addMarkerSelected() {
    return {
        type: 'ADD_MARKER_SELECTED'
    }
}

export function addMarkerUnselected() {
    return {
        type: 'ADD_MARKER_UNSELECTED'
    }
}

export function showHoverBox(data) {
    return {
        type: 'SHOW_HOVER_BOX',
        payload: data
    }
}

export function hideHoverBox() {
    return {
        type: 'HIDE_HOVER_BOX'
    }
}