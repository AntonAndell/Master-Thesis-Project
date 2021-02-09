
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
var util = require('util'),
    graphviz = require('graphviz');

// Create digraph G
var g = graphviz.digraph("G");



// Generate a PNG output

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
let mamState = Mam.init(provider);
var myArgs = process.argv.slice(2);


Root = myArgs[0]


function fetchTarget(root) {
    
    current_root = ""
    Metadata = {}
    var current_node = g.addNode(root, { "shape":"Square", "label": "Next Target"} )
    return Mam.fetchSingle(root, "public").then(result => {
        data = ""
        delegations = {}
        if (typeof result.payload == 'undefined'){
            return
        }
        next_root = result.nextRoot
        g.addEdge(root, next_root);
        changes = JSON.parse(trytesToAscii(result.payload))
        //console.log(changes)
        Object.keys(changes).forEach(key => Metadata[key] = changes[key])
        delete changes["Delegations"]
        Object.keys(changes).forEach(key => data = data + key +":"+  "<Attrs>"+"\n")
        //console.log(Object.keys(Metadata["Delegations"]))
        Object.keys(Metadata["Delegations"]).forEach(key => {
            data = data + key +":"+  "<Root>"+"\n"
            g.addEdge(root, Metadata["Delegations"][key]["New"]);
            fetchTarget(Metadata["Delegations"][key]["New"])    
                        
        });
        current_node.set("label", data)
        //console.log(next_root)
        
        return fetchTarget(next_root)
        
    })   

}

function fetchSnapshot(root) {

    current_root = ""
    Metadata = {}
    var current_node = g.addNode(root, { "shape":"Square", "label": "Next Snapshot"} )
    return Mam.fetchSingle(root, "public").then(result => {
        if (typeof result.payload == 'undefined'){
            return
        }
        //console.log("snapping")
        next_root = result.nextRoot
        g.addEdge(root, next_root);
        changes = JSON.parse(trytesToAscii(result.payload))
        current_node.set("label", changes["Version"])
        //console.log("snapping1")
        changes["End_Roots"].forEach(endRoot => {
            g.addEdge( root, endRoot);
        });
       
        
        //console.log("snapping3")
        return fetchSnapshot(next_root)
        
    })   
   
}
function fetchMetadata(root) {
    var RootMetadata = {};
    var RootRoot = g.addNode( root, { "shape":"Square", "label": "root"} );
    var result;
    return Mam.fetchSingle(root, "public").then(result => {
  
        if (typeof result.payload == 'undefined'){
            return
        }
        next_root = result.nextRoot
        Roots = JSON.parse(trytesToAscii(result.payload))
        
        snap = Roots["Snapshot"]
        target = Roots["Target"]
        g.addEdge( RootRoot, next_root);
        if (typeof snap != 'undefined'){
            if (snap["Previous"]){
                g.addEdge( RootRoot, snap["Previous"]);
            }
            fetchSnapshot(snap["New"])
            g.addEdge( RootRoot, snap["New"]);
        }
        if (typeof target != 'undefined'){
            if (target["Previous"]){
                g.addEdge( target["Previous"],RootRoot);
            }
            fetchTarget(target["New"])
            g.addEdge( RootRoot, target["New"]);
        }
        
        return fetchMetadata(next_root)
        
        })
   
    
    
    
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

async function main (){
    a = await fetchMetadata("ILXGXKQOYKFLIGZLFCFJKKXYD9IXPYXESVYEDKHFCUVFSMJRRZVFWTWNZKQKJXOKLSJRAXAARLDGEBXZP")
   
    await sleep(6000)
    console.log( g.to_dot() , a);
    a = g.output( "png", "test011.png" );

    console.log("exported",a)
}
// Callback used to pass data out of the fetch
main()