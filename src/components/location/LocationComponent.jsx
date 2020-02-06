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
            title: "",
            description: "",
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            image: "",
            /*  imagePreview: "" */
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
                title: response.data.title,
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }
            ));
    }

    validate(values) {
        let errors = {};
        if (!values.title) {
            errors.title = 'Enter a Title';
        } else if (values.title.length < 5) {
            errors.title = 'Enter atleast 5 characters in title';
        }
        if (!values.description) {
            errors.description = 'Enter a description';
        } else if (values.description.length < 10) {
            errors.description = 'Enter atleast 10 characters in description';
        }
        
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date';
        }
        console.log(values);
        return errors;
    }

    _handleImage(event) {
        event.preventDefault()

        let reader = new FileReader()

        let file = event.target.files[0]

        console.log("Image", file)

        reader.onloadend = () => {
            this.setState({
                image: file,
                /*     imagePreview: reader.result */
            })
        }
        reader.readAsDataURL(file)
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();

        let location = {
            id: this.state.id,
            title: values.title,
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

            /*  let formData = new FormData();
            if ( this.state.id !== "" || this.state.id !== null) {
                formData.append("id", this.state.id)
            }
            formData("description", values.description)
            formData("targetDate", values.targetDate)
            formData("image", this.state.image)
    
            if (this.state.id === -1) {
                LocationDataService.createLocation(username, formData).then(() => this.props.history.push('/locations')
                );
            } else {
                LocationDataService.updateLocation(username, formData).then(() => this.props.history.push('/locations')
                );
                console.log(values);
            }
        } */

    render() {
        let { title, description, targetDate, image } = this.state;
        /* let { description, targetDate, image, imagePreview  } = this.state; */
        /*         let $imagePreview = null
        
                if (imagePreview) {
                    $imagePreview = <img src={imagePreview} />;
                } else {
                    $imagePreview = <div>test</div>;
                }
         */
        return (
            <div>§
                <h1>Location</h1>
                <div className="container">
                    <Formik
                        initialValues={{ title, description, targetDate, image }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {props => (
                            <Form>
                                <ErrorMessage name="title" component="div" className="alert alert-warning" />
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field className="form-control" type="text" name="title" />
                                </fieldset>
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
                                    <Field className="form-control" type="file" name="image" onChange={(e) => this._handleImage(e)} />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>


                </div>
                {/*  <div>{$imagePreview}</div> */}

            </div>
        );
    }
}
export default LocationComponent;   