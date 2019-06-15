import { Data } from '../../imports/collections'

Meteor.methods({
    insertData(data) {
        Data.insert({ data })
    }
});