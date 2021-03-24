# importing the required module 
import matplotlib.pyplot as plt 
import math
import numpy as np
from iota import Iota, TryteString, Address, Tag, ProposedTransaction
from pprint import pprint
import json

TUFdata = open("TUFRoot.json", "r")
TUFdata = TUFdata.read()
TUFdata= json.loads(TUFdata)

xTUF = [] 
# corresponding y axis values 
yTUF = [] 
yTUF = np.array([len(json.dumps(TUFdata).encode("utf-8"))]) * np.array(list(range(1,31))) /1000
print(yTUF)

# x axis values 



xTUFT =list(range(1,31))  
# corresponding y axis values 
yTUFT = np.array([1588.726786660369]*30)*np.array(xTUFT)/1000
plt.rcParams.update({'font.size': 22})
plt.plot(xTUFT, yTUFT, label="TUFT")


plt.plot(xTUFT, yTUF, label="TUF") 

# naming the x axis 
plt.xlabel('Number of Root updates') 
# naming the y axis 2
plt.ylabel('Kilobytes') 
  
# giving a title to my graph 
plt.title('Full Root download size') 
  
# function to show the plot 
plt.legend()
plt.show() 