import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LocationDataService from './LocationDataService.js';
import AuthenticationService from './auth/AuthenticationService.js';

class LocationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            image: "",
            imagePreview: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        }

        let username = AuthenticationService.getLoggedInUserName();
        LocationDataService.retrieveLocation(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }
            ));
    }

    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = 'Enter a Description';
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description';
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date';
        }

        console.log(values);
        return errors;
    }

    _handleImage(event) {
        event.preventDefault()

        let reader = new FileReader()

        let file = event.target.files[0]

        console.log("Image", file)

        reader.onloaded = () => {
            this.setState({
                image: file,
                imagePreview: reader.result
            })
        }
       reader.readAsDataURL(file)
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();

        let location = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        };

        if (this.state.id === -1) {
            LocationDataService.createLocation(username, location).then(() => this.props.history.push('/locations')
            );
        } else {
            LocationDataService.updateLocation(username, this.state.id, location).then(() => this.props.history.push('/locations')
            );
            console.log(values);
        }
    }

    // uploadLocation(id){
    //     customBtn.addEventListener("click", function(){
    //         realFileBtn.click();
    //     });

    //     realFileBtn.addEventListener("change", function(){
    //         if(realFileBtn.value) {
    //             customTxt.innerHTML = realFielBrn.value;
    //         } else "no Picture chosen"
    //     })
    // }

    render() {
        let { description, targetDate, image } = this.state;

        let { imagePreview } = this.state
        let $imagePreview = null

        if (imagePreview) {
            $imagePreview = <img src={imagePreview} />
        } else {
            $imagePreview = <div> </div>
        }

        return (
            <div>
                <h1>Location</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate, image }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {props => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                               <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Image</label>
                                    <Field className="form-control" type="file" name="image" onChange={(e) => this._handleImage(e)}/>
                                    <div>{$imagePreview}</div>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}
export default LocationComponent;   