TargetRoot=$1
Name=$2
echo Input Snapshot Seed config
read SEED


JSON_STRING='{"version":"'"$Name"'","Target":"'"$TargetRoot"'"}'

echo $JSON_STRING > test.json

node MamSend.js $SEED $JSON_STRING 