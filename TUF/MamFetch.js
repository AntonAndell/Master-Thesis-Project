
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
const { start } = require('repl');
 

const mode = 'public'
const provider = 'https://nodes.thetangle.org:443'
let mamState = Mam.init(provider);
var myArgs = process.argv.slice(2);
Root = myArgs[0]
version_name = myArgs[1]
//console.log(version_name, Root)

async function fetchTarget(start_root, end_root, target_roots, Metadata) {
    current_root = ""
    next_root = start_root
    while (target_roots.indexOf(current_root) < 0) {
        if (current_root == end_root){
            return Metadata
        }
 
        const result = await Mam.fetchSingle(next_root, "public")
        if (typeof result.payload == 'undefined'){
            //console.log("here end of rooit")
            return {}
        }
        current_root = next_root
        next_root = result.nextRoot
        changes = JSON.parse(trytesToAscii(result.payload))
        changes["Delegations"] = convert_delegations(changes["Delegations"])
        join(Metadata,changes)

    }
    //console.log(Metadata["Delegations"])
    target_roots.splice(target_roots.indexOf(current_root), 1)
    for (let i = 0; i < Object.keys(Metadata["Delegations"]).length; i++){
        DelData = {"Delegations":{}}
        key = Object.keys(Metadata["Delegations"])[i]
        try {
            for (let i = 0; i < Metadata["Delegations"][key].length; i=i+2){
                DelData = await fetchTarget(Metadata["Delegations"][key][i], Metadata["Delegations"][key][i+1], target_roots, DelData)
            } 
        } catch (error) {
            console.log(start_root)
            console.log(error)
        }
        
        
        Object.keys(DelData).forEach(key => {
            if (key != "Delegations"){
                Metadata[key] = DelData[key]
            }
        })
        //console.log("before merge", "data")
    }
    //console.log("return" ,Metadata)

    return Metadata
}
async function fetchVersionRoots(version, root, end) {
    var Metadata = {};
    current_version = ""
    current_root = ""
    next_root = root
  
    while (current_version != version) {
        //console.log(current_version)
        //console.log(next_root)
        if (current_root == end){
            console.log("here")
            return 
        }
        const result = await Mam.fetchSingle(next_root, "public")
        
        if (typeof result.payload == 'undefined'){
            return 
        }
        current_root = next_root
        next_root = result.nextRoot
        changes = JSON.parse(trytesToAscii(result.payload))
        current_version = changes["Version"]
    }
    
    return changes["End_Roots"]
}
async function fetchMetadata(version, root) {
    var Metadata = {};
    var target_roots = [];
    var snap_roots = [];
    console.time('someFunction')
    const result = await Mam.fetch(root, "public")

    result.messages.forEach(function(message){
        Roots = JSON.parse(trytesToAscii(message))
        snap = Roots["Snapshot"]
        target = Roots["Target"]
        if (typeof snap != 'undefined'){
            if (snap["Previous"]){
            snap_roots.push(snap["Previous"]);
            }
            snap_roots.push(snap["New"]);
        }
        if (typeof target != 'undefined'){
            if (target["Previous"]){
                target_roots.push(target["Previous"]);
            }
            target_roots.push(target["New"]);
        }
    })

    //console.log(RootMetadata)
    var end_roots
    for (let i = 0; i<=snap_roots.length; i=i+2){
        end_roots = await fetchVersionRoots(version, snap_roots[i],snap_roots[i+1])
        if (end_roots.length <= 0){
            break
        }
    }
    //console.log(end_roots)
    Metadata= {"Delegations":{}}
    for (let i = 0; i<target_roots.length; i=i+2){
        //console.log("pre", end_roots)
        Metadata = await fetchTarget(target_roots[i], target_roots[i+1], end_roots, Metadata)
        //console.log("post", end_roots)
        if (end_roots.length <= 0){
            break
        }

        
    }
    //
    console.timeEnd('someFunction')
    //console.log("full", Metadata)
    return


    
}
function convert_delegations(Delegations){
    Object.keys(Delegations).forEach(key => {
        if (Delegations[key]["Prevoius"]){
            Delegations[key] = [Delegations[key]["Prevoius"],Delegations[key]["New"]]
        }else{
            Delegations[key] = [Delegations[key]["New"]]
        }
    })
    return Delegations
}
function join(Metadata, changes){

    Object.keys(changes).forEach(key => {
        if (key == "Delegations"){
            //console.log(changes["Delegations"])
            del = changes["Delegations"]
            Object.keys(del).forEach(key => {
                if (key in Metadata["Delegations"]){
                    Metadata["Delegations"][key].concat(del[key])
                }else{
                    Metadata["Delegations"][key] = del[key]
                }
            })
            }else {
                Metadata[key] = changes[key]
            }
    
    })
    return Metadata
}



// Callback used to pass data out of the fetch

fetchMetadata("v3.0","ITJEL9HA9PPTHBDJNPLWQVVGBETMTDOBUBEAOR9ALKSLDSHAAMZTL9RWWONEOJEVZMKCQ9PUWOVTBVFEG")


//syncTarget("UXIVVSKXIRAHWATWRJRZNQYT9PVAFSARD9WRTL9TAXKLVLACVNCCWDDAKCZJLZGVBSIGGA9ZPQMPFBOLX","IZXNNDWMOUBKTXXTHGODUPDMRFGGIW9SDTWYINJCKD9U9NROUFECHMTUQJUBTL9HEJUUFEGVOZ9WWN9AF")