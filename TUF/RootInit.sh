cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Root.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Target.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Target2.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Del_Target1.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Del_Target2.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Snapshot.txt
PATHJSON=/home/andell/Programming/Master-Thesis-Project/TUF
RootRoot=$(node MamGetRoot.js $(cat Root.txt))
TargetRoot=$(node MamGetRoot.js $(cat Target.txt))
Target2Root=$(node MamGetRoot.js $(cat Target2.txt))
DelTargetRoot1=$(node MamGetRoot.js $(cat Del_Target1.txt))
DelTargetRoot2=$(node MamGetRoot.js $(cat Del_Target2.txt))
SnapshotRoot=$(node MamGetRoot.js $(cat Snapshot.txt))
JSON_STRING='{"Target":"'"$TargetRoot"'","Snapshot":"'"$SnapshotRoot"'"}'

node MamInit.js $(cat Root.txt) Root.json
node MamInit.js $(cat Target.txt) Target.json
node MamInit.js $(cat Target2.txt) Target2.json
node MamInit.js $(cat Del_Target1.txt) Del_Target1.json
node MamInit.js $(cat Del_Target2.txt) Del_Target2.json
node MamInit.js $(cat Snapshot.txt) Snapshot.json

#node MamSend.js $PATHJSON/Root.json $JSON_STRING 