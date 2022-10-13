
function seeObjects() {
    let args = Array.from(arguments);
    
    console.log("seeobjects")
    args.forEach((val) => console.log(val))

    /*for (const [key, value] of Object.entries(req.body)) {
        console.log(`ullala' ${key}: ${value}`);
    }
    */
}

function seeObjects2() {
    let args = Array.from(arguments);
    
    console.log("seeobjects")
    args.forEach((val) => console.log(val))

    /*for (const [key, value] of Object.entries(req.body)) {
        console.log(`ullala' ${key}: ${value}`);
    }
    */
}

//module.exports.seeObjects = seeObjects;     
//module.exports.seeObjects2 = seeObjects2;     

module.exports = {
    seeObjects: seeObjects,     
    seeObjects2: seeObjects2
}     




