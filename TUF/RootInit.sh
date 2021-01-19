cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Root.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Target.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Snapshot.txt
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81} > Timestamp.txt
RootRoot=$(node MamGetRoot.js $(cat Root.txt))
TargetRoot=$(node MamGetRoot.js $(cat Target.txt))
SnapshotRoot=$(node MamGetRoot.js $(cat Snapshot.txt))
TimestampRoot=$(node MamGetRoot.js $(cat Timestamp.txt))
JSON_STRING='{"Target":"'"$TargetRoot"'","Snapshot":"'"$SnapshotRoot"'","Timestamp":"'"$TimestampRoot"'"}'
echo $JSON_STRING

