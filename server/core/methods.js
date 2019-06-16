import { Data } from '../../imports/collections'

Meteor.methods({
    insertData(data) {
        const dataArray = data.split(",");
        const deviceID = dataArray[0];
        const latitud = dataArray[1];
        const longitud = dataArray[2];
        const datetime = dataArray[3];
        data = {
            deviceID, latitud,longitud,datetime
        }
        Data.insert( data )
    }
});