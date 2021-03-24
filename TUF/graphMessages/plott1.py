# importing the required module 
import matplotlib.pyplot as plt 
import math
from iota import Iota, TryteString, Address, Tag, ProposedTransaction
from pprint import pprint
import json

TUFdata = open("TUFTarget1.json", "r")
TUFdata = TUFdata.read()
TUFdata= json.loads(TUFdata)
filedata = TUFdata["signed"]["targets"]["file.txt"]
xTUF = [] 
# corresponding y axis values 
yTUF = [] 
for i in range(1,101):
    yTUF += [len(json.dumps(TUFdata).encode("utf-8"))/1000]
    TUFdata["signed"]["targets"]["file"+str(i)+".txt"] = filedata
    xTUF += [i]

# x axis values 


TUFTdata = open("TUFTTarget.json", "r")
TUFTdata = TUFTdata.read()
TUFTdata= json.loads(TUFTdata)
x2TUFT = [] 
# corresponding y axis values 
y2TUFT = [] 
for i in range(1,101):

    tstring = TryteString.from_unicode(json.dumps(TUFTdata))
    trytes = math.ceil(len(tstring)/2187)*2673+2*2673
    y2TUFT += [(trytes*math.log(3)*3)/(math.log(2)*8)/1000]
    TUFTdata["file"+str(i)+".txt"] = filedata
    x2TUFT += [i]

size = len(json.dumps(TUFTdata).encode("utf-8"))

plt.rcParams.update({'font.size': 22})

xTUFT =list(range(1,101))  
# corresponding y axis values 
yTUFT = [1588.726786660369*3/1000]*100
plt.plot(xTUFT, yTUFT, label="TUFT updating 1 target file")

plt.plot(x2TUFT, y2TUFT, label="TUFT updating all target files")
# plotting the points  
plt.plot(xTUF, yTUF, label="TUF") 

# naming the x axis 
plt.xlabel('Number of Target Files') 
# naming the y axis 2
plt.ylabel('Kilobytes Downloaded') 

# giving a title to my graph 
plt.title('Target download size') 
  
# function to show the plot 
plt.legend()
plt.show() 