'use strict'

var Couchbird = require("Couchbird")({
    server_ip: "127.0.0.1",
    n1ql: "127.0.0.1:8093"
}).bucket("mt");
var Model = require("./Model")(Couchbird);


//var sch = new Model.Object.Schedule("schedule/1");
//var sch = new Model.Object.Schedule(1);
//var sch = new Model.Object.Schedule({
//    type: "schedule",
//    id: 1,
//    subname: "plan"
//}, "plan");
//console.log(sch.selector, sch.type, sch.id, sch);

//sch.get_from_database()
//    .then((res) => {
//        console.log('upsert: ', sch);
//        return sch.upsert();
//    })
//    .then((res) => {
//        console.log('get_and_lock: ', sch);
//        return sch.get_and_lock(30);
//    })
//    .then((res) => {
//        console.log('res: ', sch);
//        return sch.upsert();
//    })
//    .then((res) => {
//        console.log('unlock: ', sch);
//        return sch.unlock();
//    })
//    .then((res) => {
//        console.log('unlock: ', sch);
//        return sch.unlock();
//    })

//var sch = new Model.Collection.Simple(["schedule/1", {
//    id: "schedule-plan/1",
//    selector: "plan"
//}]);
//sch.load_from_db()
//    .then(() => {
//        sch.as_array()[0].set_selector("plan", {
//            compose_data: {
//                type: "schedule",
//                id: 2,
//                subname: "sample"
//            }
//        });
//        console.log("LOAD", sch.as_array());
//    })


var sch = new Model.Collection.Typed({
    type: "operator"
});
sch.load_from_db()
    .then(() => {
        console.log("LOAD", sch.as_array());
    })