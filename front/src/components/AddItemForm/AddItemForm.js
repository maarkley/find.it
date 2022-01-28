import React from 'react'
import { connect } from 'react-redux'
import * as MapActions from '../../actions/Map'
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'
import toastr from 'toastr'

class AddItemForm extends React.Component {

    constructor() {
        super()

    }

    componentWillMount() {
        if ( !this.props.authenticated ) {
            toastr.warning('Musisz być zalogowany by dodawać ogłoszenia')
            console.log('this props history: ', this.props.history)
            this.props.history.push('/')
        } else {
            this.props.dispatch(MapActions.addItemFormActivate())
        }
    }

    componentWillUnmount() {
        
        this.props.dispatch(MapActions.addItemFormDeactivate())        
    }

    componentWillUpdate(nextProps) {
        console.log('receiving props: ', nextProps)
        if ( nextProps.map.recentlyAddedReport && !this.props.map.recentlyAddedReport ) {
            this.props.history.push('/')   
        }

    }

    render() {

        let { name, category_id, description } = this.props.addItemForm.errors 

        let deleteMarkerBtnStatus = this.props.addItemForm.addMarker.placeName ? '' : 'disabled'
        let nameStatus = name ? 'invalid' : ''
        let categoryStatus = category_id ? 'invalid' : ''
        let descriptionStatus = description ? 'invalid' : ''

        let nameError = name ? name[0] : ''
        let categoryError = category_id ? category_id[0] : ''
        let descriptionError = description ? description[0] : ''
        let markerSelected = this.props.addItemForm.markerSelected
        let addMarkerBtnStatus = this.props.addItemForm.addMarkerMode ? 'active' : ''
        let addMarkerBtnClass = markerSelected ? 'save' : ''

        return <div>
                    <div className="heading-row">
                        <Link to="/" className="back-btn">{"< POWRÓT"}</Link>
                        <h3 className="big-title">Dodaj przedmiot</h3>
                    </div>
                    <div className="body-row">
                        <div className="sidebar-form">
                            <div className={"sidebar-form__group "  + nameStatus}>
                                <label>
                                    Nazwa: 
                                </label>
                                <input type="text" name="name" onChange={this.onChange.bind(this)}/>
                                <div className="form-input-group__message">{nameError}</div>
                            </div>
                            <div className={"sidebar-form__group "  + categoryStatus}>
                                <label>Kategoria:</label>
                                    <select name="category_id" onChange={this.onChange.bind(this)}>
                                        <option default value="0">Wybierz kategorię</option>
                                        <option default value="1">Dokumenty</option>
                                        <option default value="2">Klucze</option>
                                        <option default value="3">Smartfony</option>
                                        <option default value="4">Ubrania</option>
                                    </select>
                                    <div className="form-input-group__message">{categoryError}</div>
                            </div>
                            <div className={"sidebar-form__group "  + descriptionStatus}>
                                <label>Krótki opis:</label>
                                <input type="text" name="description" onChange={this.onChange.bind(this)}/>
                                <div className="form-input-group__message">{descriptionError}</div>
                            </div>
                            <div className="sidebar-form__group">
                                <label>
                                    Miejsce:
                                </label>
                                <input type="hidden" name="position" value={this.props.addItemForm.addMarker.placeName}/>
                                    <div className={"btn icon-btn fill-white blue " + addMarkerBtnStatus + " " +  addMarkerBtnClass } onClick={this.markerModeClick.bind(this)}>
                                        <ReactSVG path="/img/icons/marker.svg" />
                                        <div className="txt">
                                        {this.props.addItemForm.markerSelected ? 'Zapisz' : 'Dodaj miejsce na mapie' }
                                        </div>
                                    </div>
                                    <div className={"place " + addMarkerBtnClass }>
                                    {this.props.addItemForm.addMarker.placeName}
                                    </div>
                       
                            </div>                            
                            <div className="btn btn--small " onClick={this.submit.bind(this)}>
                                Dodaj
                            </div>
                        </div>     
                    </div>
                </div>
    }

    clearMarkerPosition() {

        this.props.dispatch(MapActions.clearAddMarkerPosition())

    }

    markerModeClick() {
        let markerSelected = this.props.addItemForm.markerSelected
        if ( markerSelected ) {
            this.props.dispatch((MapActions.addMarkerModeOff()))
            this.props.dispatch((MapActions.addMarkerUnselected()))                                                    
        } else {
            this.props.dispatch((MapActions.addMarkerModeOn()))        
            toastr.info('Dodaj na mapie miejsce, w którym znalazłeś przedmiot.')
        }


    }

    onChange(e) {

        this.props.dispatch(MapActions.addItemFormUpdate(e.target))

    }


    navigateBack() {
        this.props.history.push('/')
    }

    submit() {

        this.props.dispatch(MapActions.addItem({
            name: this.props.addItemForm.fields.name,
            description: this.props.addItemForm.fields.description,
            category_id: this.props.addItemForm.fields.category_id,
            coordinate: this.props.addItemForm.addMarker.coords
        }))

    }

}

export default connect((state) => {
    return {
        authenticated: state.user.authenticated,
        map: state.map,
        addItemForm: state.map.addItemForm
    }
})(AddItemForm)

