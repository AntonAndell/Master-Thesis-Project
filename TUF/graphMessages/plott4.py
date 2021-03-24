# importing the required module 
import matplotlib.pyplot as plt 
import math
from iota import Iota, TryteString, Address, Tag, ProposedTransaction
from pprint import pprint
import json

TUFdata = open("TUFTarget1.json", "r")
TUFdata = TUFdata.read()
TUFdata= json.loads(TUFdata)
xTUF = []
bytes_ =  len(json.dumps(TUFdata).encode("utf-8"))
print("bytes", bytes_)


tstring = TryteString.from_unicode(json.dumps(TUFdata))
trytes = len(tstring)
tbytes = (trytes*math.log(3)*3)/(math.log(2)*8)
print("trytes",trytes)


# x axis values 
