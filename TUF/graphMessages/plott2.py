# importing the required module 
import matplotlib.pyplot as plt 
import numpy as np
import math
from iota import Iota, TryteString, Address, Tag, ProposedTransaction
from pprint import pprint
import json

TUFdata = open("TUFTarget1.json", "r")
TUFdata = TUFdata.read()
TUFdata= json.loads(TUFdata)
filedata = TUFdata["signed"]["targets"]["file.txt"]


TUFTdata = open("TUFTTarget.json", "r")
TUFTdata = TUFTdata.read()
TUFTdata= json.loads(TUFTdata)
for i in range(1,5):
    TUFTdata["file"+str(i)+".txt"] = filedata
tstring = TryteString.from_unicode(json.dumps(TUFTdata))
trytes = math.ceil(len(tstring)/2187)*2673+2*2673
size5 = (trytes*math.log(3)*3)/(math.log(2)*8)/1024

for i in range(5,15):
    TUFTdata["file"+str(i)+".txt"] = filedata
tstring = TryteString.from_unicode(json.dumps(TUFTdata))
trytes = math.ceil(len(tstring)/2187)*2673+2*2673 
size10 = (trytes*math.log(3)*3)/(math.log(2)*8)/1024


for i in range(15,25):
    TUFTdata["file"+str(i)+".txt"] = filedata
tstring = TryteString.from_unicode(json.dumps(TUFTdata))
trytes = math.ceil(len(tstring)/2187)*2673+2*2673
size15 = (trytes*math.log(3)*3)/(math.log(2)*8)/1024



fig = plt.figure()

X = np.arange(5)
print(size15)
data = [
    [size5*1,size5*5,size5*10,size5*20,size5*25], 
    [size10*1,size10*5,size10*10,size10*20,size10*30], 
    [size15*1,size15*5,size15*10,size15*20,size15*30], 
]
plt.rcParams.update({'font.size': 22})
plt.bar(X + 0.00, data[0], color = 'b', width = 0.25, label="5 files updated")
plt.bar(X + 0.25, data[1], color = 'g', width = 0.25, label="15 files updated")
plt.bar(X + 0.50, data[2], color = 'r', width = 0.25, label="25 files updated")
#ax.set_xticks(X,(5,10,15,20,25))

plt.xticks([r + 0.25 for r in range(len(data[0]))], 
           ['1','5','10', '20', '30']) 
# naming the x axis 
plt.ylabel('Kilobytes downloaded') 

plt.title('Full Target traversal') 
# naming the y axis 2
plt.xlabel('Number of updates') 
plt.legend()
plt.show()
