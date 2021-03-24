a=[12.8,12.89,18.251, 12.654, 13.587]
b=[7.494, 7.447, 13.418, 10.551, 10.179]
c=[6.069, 6.717, 7.848, 5.706, 6.026]

#Large 12.8,12.89,18,251, 12.654, 13.587
#Normal 7.494, 7.447, 13.418, 10.551, 10.179
#Comp    6.069, 6.717, 7.848, 5.706, 6,026
import statistics

print(statistics.mean(a), max(a)-statistics.mean(a),statistics.mean(a)-min(a))

print(statistics.mean(b), max(b)-statistics.mean(b),statistics.mean(b)-min(b))

print(statistics.mean(c), max(c)-statistics.mean(c),statistics.mean(c)-min(c))
