import axios from 'axios'
import {JPA_API_URL} from './../Constants'

class LocationDataService {

    retrieveAllLocations(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/locations`);
    }

    retrieveLocation(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/locations/${id}`);
    }

    deleteLocation(name, id) { 
        return axios.delete(`${JPA_API_URL}/users/${name}/locations/${id}`);
        }

    updateLocation(name, id, location) {
        return axios.put(`${JPA_API_URL}/users/${name}/locations/${id}`, location);
}

    createLocation(name, location) {
        return axios.post(`${JPA_API_URL}/users/${name}/locations/`, location);
}
}

export default new LocationDataService()