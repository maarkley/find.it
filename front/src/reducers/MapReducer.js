import { addItem } from "../actions/Map";
import toastr from 'toastr'

const initialState = {
    markers: [],
    userReports: [],
    recentlyAddedReport: false,
    initialZoom: 13,
    hoverBox: {
        show: false,
        description: ''
    },
    initialPosition: {
        lat: 53.4328564,
        lng: 14.549591
    },
    currentReport: {
        name: '',
        description: '',
        coordinate: {
            lat: null,
            lng: null
        },
        category: {
            name: '',
            id: null
        }
    },
    addItemForm: {
        isActive: false,
        fields: {
            name: '',
            description: '',
            category_id: '',
            position: ''
        },
        errors: {
            name: '',
            description: '',
            category_id: '',
            position: ''
        },
        addMarker: {
            coords: {
                lat: null,
                lng: null
            }
        },
        markerSelected: false,
        addMarkerMode: false
    }
}

let MapReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'CLEAR_ADD_MARKER_POSITION':
            return {...state, 
                addItemForm: {
                    ...state.addItemForm,
                    addMarker: {
                        placeName: '',
                        coords: {
                            lat: null,
                            lng: null
                        }
                    }
                }
            }
        case 'ADD_MARKER_SELECTED':
            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,
                    markerSelected: true
                }   
            }
        case 'ADD_MARKER_UNSELECTED':
            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,
                    markerSelected: false
                }   
            }
        case 'ADD_MARKER_UNSELECTED':
            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,
                    markerSelected: false
                }   
            }
        case 'ADD_MARKER_MODE_ON':
            return {...state, addItemForm: {
                ...state.addItemForm,
                addMarkerMode: true
            }}
        case 'ADD_MARKER_MODE_OFF':
            return {...state, addItemForm: {
                ...state.addItemForm,
                addMarkerMode: false
            }}
        case 'TOGGLE_MARKER_INFO_BOX':
            return {
                ...state,
                markers: state.markers.map((item) => {
                    return {
                        ...item, 
                        showInfo: action.payload === item.slug ? !item.showInfo : false
                    }
                })
            }

        case 'SHOW_MARKER_INFO_BOX':
            return {
                ...state,
                markers: state.markers.map((item) => {
                    return {
                        ...item, 
                        showInfo: action.payload.id == item.id ? true : false
                    }
                })
            }

        case 'GET_ALL_REPORTS_PENDING':
            return state
        case 'GET_ALL_REPORTS_FULFILLED':
            let markers = action.payload.data.data.map((item, key) => {
                item.showInfo = false
                return item
            })
            return {
                ...state,
                markers: markers,
                userReports: markers
            }
        case 'GET_ALL_REPORTS_REJECTED':
            return state

        case 'ADD_ITEM_FORM_DEACTIVATE':
            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,
                    isActive: false
                }
            }
        case 'ADD_ITEM_FORM_ACTIVATE':
            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,
                    isActive: true
                }
            }
            
        case 'ADD_ITEM_PENDING':
            return {
                ...state,
                fetching: true
            }
        case 'ADD_ITEM_FULFILLED':
            if ( action.payload.status == 200 ) {
                toastr.success('Twoje zgłoszenie zostało pomyślnie dodane!')
                return {
                    ...state,
                    fetching: false,
                    addItemForm: {
                        ...state.addItemForm,
                        errors: {}
                    },
                    recentlyAddedReport: true,
                    markers: action.payload.data.data
                }                
            }
        case 'ADD_ITEM_REJECTED':
            let { response } = action.payload
            if ( response.status = 422 ) {
                return {
                    ...state,
                    fetching: false,
                    addItemForm: {
                        ...state.addItemForm,
                        errors: response.data.message
                    }
                }
            }
        case 'ADD_ITEM_FORM_PLACE_UPDATE':
            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,
                    addMarker: {
                        coords: action.payload.placePosition,
                        placeName: action.payload.placeName
                    }
                }
            }
        case 'ADD_ITEM_FORM_UPDATE':
            console.log('addint item attr: ', action.payload.getAttribute('name'))

            let targetAttribute = action.payload.getAttribute('name')
            let targetValue = action.payload.value

            return {
                ...state,
                addItemForm: {
                    ...state.addItemForm,                    
                    fields: {
                        ...state.addItemForm.fields,
                        [targetAttribute] : targetValue
                    }
                }
            }

            case 'GET_REPORT_BY_SLUG_PENDING':
                return state
            case 'GET_REPORT_BY_SLUG_FULFILLED':
                return {
                    ...state,
                    currentReport: action.payload.data.data               
                }
            case 'GET_REPORT_BY_SLUG_REJECTED':
                return state

            case 'SET_CURRENT_REPORT':
                return {
                    ...state,
                    currentReport: state.markers.filter((item) => {
                        return item.slug == action.payload
                    })[0]
                }

            case 'CLEAR_CURRENT_REPORT':
                return {
                    ...state,
                    currentReport: {
                        name: '',
                        description: '',
                        coordinate: {
                            lat: null,
                            lng: null
                        },
                        category: {
                            name: '',
                            id: null
                        }
                    }
                }
            
            case 'SHOW_HOVER_BOX':
                return {
                    ...state,
                    hoverBox: {
                        show: true,
                        description: action.payload.description
                    }
                }
            case 'HIDE_HOVER_BOX':
                return {
                    ...state,
                    hoverBox: {
                        show: false,
                        description: ""
                    }
                }
        default:
            return state
    }

}

export default MapReducer