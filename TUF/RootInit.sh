cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Root.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Target.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Snapshot.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Timestamp.txt
PATHJSON=/home/andell/Programming/Master-Thesis-Project/TUF
RootRoot=$(node MamGetRoot.js $(cat Root.txt))
TargetRoot=$(node MamGetRoot.js $(cat Target.txt))
SnapshotRoot=$(node MamGetRoot.js $(cat Snapshot.txt))
TimestampRoot=$(node MamGetRoot.js $(cat Timestamp.txt))
JSON_STRING='{"Target":"'"$TargetRoot"'","Snapshot":"'"$SnapshotRoot"'","Timestamp":"'"$TimestampRoot"'"}'

node MamInit.js $(cat Root.txt) Root.json
node MamInit.js $(cat Target.txt) Target.json
node MamInit.js $(cat Snapshot.txt) Snapshot.json
node MamInit.js $(cat Timestamp.txt) Timestamp.json
echo $JSON_STRING

node MamSend.js $PATHJSON/Root.json $JSON_STRING 