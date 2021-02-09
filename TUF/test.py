import hashlib
import subprocess
import os 
import json
import time

def get_hash(path):
    f = open(path, "r")
 
    m = hashlib.sha256()
    m.update(f.read().encode())
    res = {
        "Length": f.seek(0,2),
        "Sha256":  m.hexdigest()
    }
    f.close()
    return res

def get_next_root(jsonPath):
    f = open(jsonPath, "r")
    state = json.loads(f.read())
    return state["channel"]["next_root"]

def get_root(Path):
    r= open(Path, "r")
    root_res = subprocess.run(['node', 'MamGetRoot.js', r.read()], capture_output=True)
    r.close()
    return root_res.stdout.rstrip().decode()


def write_file(path, data):
    f = open(path, "a+")
    f.write(data)
    f.close()


#Setup dir
subprocess.run(["sh", "clean.sh"])
subprocess.run(["sh", "RootInit.sh"])
os.mkdir("Test-Project")
os.mkdir("Test-Project/TestDir")


#Setup
data = {
    "Target":{
        "Previous": "",
        "New": get_root("Target.txt")
    },
    "Snapshot":{
        "Previous": "",
        "New": get_root("Snapshot.txt")
    },
    }
subprocess.run(["node", "MamSend.js","Root.json", json.dumps(data)]) 


#####

write_file("Test-Project/file1.txt", "testfile 1")
write_file("Test-Project/file2.txt", "testfile 2")
write_file("Test-Project/TestDir/file3.txt", "testfile 3")

#init
data = {
    "file1": get_hash("Test-Project/file1.txt"),
    "file2": get_hash("Test-Project/file2.txt"),
    "TestDir/file3.txt": get_hash("Test-Project/TestDir/file3.txt"),
    "Delegations":{}
    }

subprocess.run(["node", "MamSend.js","Target.json", json.dumps(data)]) 

#######################

version_roots = [get_next_root("Target.json")]

write_file("Test-Project/file1.txt", "testfile 1 fixed")
data = {
    "file1": get_hash("Test-Project/file1.txt"),
    "Delegations":{}
    }
subprocess.run(["node", "MamSend.js","Target.json", json.dumps(data)]) 

data = {
    "Version": "v1.0",
    "End_Roots": version_roots
    }
subprocess.run(["node", "MamSend.js","Snapshot.json", json.dumps(data)]) 

#######################

write_file("Test-Project/file4.txt", "testfile 4 added")
write_file("Test-Project/file2.txt", "testfile 2 changed")
data = {
    "file2": get_hash("Test-Project/file2.txt"),
    "file4": get_hash("Test-Project/file4.txt"),
    "Delegations":{
        "Test-Project/TestDir/": {
            "Previous" : "",
            "New": get_root("Del_Target1.txt")
        }
    }
}
subprocess.run(["node", "MamSend.js","Target.json", json.dumps(data)]) 

#################################
#Del1 Post


version_roots = [get_next_root("Target.json"),get_root("Del_Target1.txt")]

write_file("Test-Project/TestDir/file3.txt", "testfile 3 delegated")
write_file("Test-Project/TestDir/file5.txt", "testfile 5 creatated and delegated")
data = {
    "TestDir/file3.txt": get_hash("Test-Project/TestDir/file3.txt"),
    "TestDir/file5.txt": get_hash("Test-Project/TestDir/file5.txt"),
    "Delegations":{}
   
}
subprocess.run(["node", "MamSend.js","Del_Target1.json", json.dumps(data)]) 


data = {
    "Version": "v1.2",
    "End_Roots": version_roots
    }
subprocess.run(["node", "MamSend.js","Snapshot.json", json.dumps(data)]) 


##############################

write_file("Test-Project/file1.txt", "testfile 1 reset")
write_file("Test-Project/file2.txt", "testfile 2 reset")


data = {
    "file1": get_hash("Test-Project/file1.txt"),
    "file2": get_hash("Test-Project/file2.txt"),
    "Delegations":{}
    }

subprocess.run(["node", "MamSend.js","Target.json", json.dumps(data)]) 
####

version_roots = [get_next_root("Target.json"),get_root("Del_Target1.txt"), get_root("Del_Target2.txt")]
last_good_Target_root = get_next_root("Target.json")
write_file("Test-Project/file1.txt", "testfile 1 next del")
data = {
    "file1": get_hash("Test-Project/file1.txt"),
    "Delegations":{
        "Test-Project/DelDir/": {
            "Previous" : "",
            "New": get_root("Del_Target2.txt")
        }
    }
    }
subprocess.run(["node", "MamSend.js","Target.json", json.dumps(data)]) 


############################

os.mkdir("Test-Project/DelDir")
write_file("Test-Project/DelDir/file6.txt", "testfile 6 new")
write_file("Test-Project/DelDir/file7.txt", "testfile 7 new")
data = {
    "DelDir/file6.txt": get_hash("Test-Project/DelDir/file6.txt"),
    "DelDir/file7.txt": get_hash("Test-Project/DelDir/file7.txt"),
    "Delegations":{}
   
}
subprocess.run(["node", "MamSend.js","Del_Target2.json", json.dumps(data)]) 

####
data = {
    "Version": "v2.0",
    "End_Roots": version_roots
    }
subprocess.run(["node", "MamSend.js","Snapshot.json", json.dumps(data)]) 



############################
version_roots = [get_root("Target2.txt"),get_root("Del_Target1.txt"), get_root("Del_Target2.txt")]

write_file("Test-Project/DelDir/file6.txt", "testfile 6 change")

data = {
    "DelDir/file6.txt": get_hash("Test-Project/DelDir/file6.txt"),
    "Delegations":{}
   
}
subprocess.run(["node", "MamSend.js","Del_Target2.json", json.dumps(data)]) 




###############
write_file("Test-Project/TestDir/file3.txt", "testfile 3 change 2")
write_file("Test-Project/TestDir/file5.txt", "testfile 5 change 2")
data = {
    "TestDir/file3.txt": get_hash("Test-Project/TestDir/file3.txt"),
    "TestDir/file5.txt": get_hash("Test-Project/TestDir/file5.txt"),
    "Delegations":{}
   
}
subprocess.run(["node", "MamSend.js","Del_Target1.json", json.dumps(data)]) 

#################

##############
#Hacked Target

data = {
    "Target":{
        "Previous": last_good_Target_root,
        "New": get_root("Target2.txt")
    },
    }
subprocess.run(["node", "MamSend.js","Root.json", json.dumps(data)]) 




########


data = {
    "file2": get_hash("Test-Project/file1.txt"),
    "file4": get_hash("Test-Project/file2.txt"),
    "Delegations":{}
    }
subprocess.run(["node", "MamSend.js","Target.json", json.dumps(data)]) 


##############

#####

write_file("Test-Project/file2.txt", "testfile 2 end")
write_file("Test-Project/file4.txt", "testfile 4 end")

data = {
    "file1": get_hash("Test-Project/file2.txt"),
    "file2": get_hash("Test-Project/file4.txt"),
    "Delegations":{}
    }
subprocess.run(["node", "MamSend.js","Target2.json", json.dumps(data)]) 

####
data = {
    "Version": "v3.0",
    "End_Roots": version_roots
    }
subprocess.run(["node", "MamSend.js","Snapshot.json", json.dumps(data)]) 


##############
########

"""
time.sleep(3)
r= open("Root.txt", "r")
root_res = subprocess.run(['node', 'MamGetRoot.js', r.read()], capture_output=True)
r.close()
root_root = root_res.stdout.rstrip().decode()
subprocess.run(["node", "MamFetch.js",root_root, "v1.2"]) 
"""