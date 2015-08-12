'use strict'

let Couchbird = require("Couchbird")({
    server_ip: "127.0.0.1",
    n1ql: "127.0.0.1:8093"
}).bucket("mt");
let Model = require("./Model")(Couchbird);

//let sch = new Model.Object.Schedule("schedule/1");
//let sch = new Model.Object.Schedule(1);
//let sch = new Model.Object.Schedule({
//    type: "schedule",
//    id: 1,
//    subname: "plan"
//}, "plan");
//console.log(sch.selector, sch.type, sch.id, sch);

//sch.getFromDatabase()
//    .then((res) => {
//        console.log('upsert: ', sch);
//        return sch.upsert();
//    })
//    .then((res) => {
//        console.log('getAndLock: ', sch);
//        return sch.getAndLock(30);
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

//let sch = new Model.Collection.Simple(["schedule/1", {
//    id: "schedule-plan/1",
//    selector: "plan"
//}]);
//sch.loadFromDatabase()
//    .then(() => {
//        sch.toArray()[0].setSelector("plan", {
//            compose_data: {
//                type: "schedule",
//                id: 2,
//                subname: "sample"
//            }
//        });
//        console.log("LOAD", sch.toArray());
//    })

let sch = new Model.Collection.Typed({
    type: "operator"
});
sch.loadFromDatabase()
    .then(() => {
        //        console.log("LOAD", sch.toArray());
        for (var n of sch) {
            console.log("N", n);
        }
    })