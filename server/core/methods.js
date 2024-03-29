import Geocoder from 'node-geocoder'
const geocoder = Geocoder({ provider: 'openstreetmap', formatter: 'json' })
import { Data } from '../../imports/api/collections'

Meteor.methods({
    insertData(data) {
        const dataArray = data.split(",");
        const deviceID = dataArray[0];
        const latitud = dataArray[1];
        const longitud = dataArray[2];
        const datetime = dataArray[3];
        geocoder.reverse({ lat: latitud, lon: longitud }, Meteor.bindEnvironment((err, res) => {
            const place = res ? res[0].formattedAddress : '...'
            data = {
                deviceID, latitud, longitud, datetime, place
            }
            Data.insert(data)
        }))
    },
    async getData(day) {
        const data = await Data.find({ datetime: new RegExp(day) }).fetch()
        return data
    }
});