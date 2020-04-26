#!/usr/local/bin/bash
clear
if [ -z "$1" ]
then
 echo "Simple utility to run a test cafe js file searching it ";
 echo "under ./test folder, with recursion"
 echo "" 
 echo "Usage $0 file.js or some unique name piece"
 echo "the unix/linux find utility is used"
 echo "$0 PPT-745"
 exit
fi

CFG_JSON="--cfg=intothebox.mantishub.io.json"
TCAFE_OPT="--skip-js-errors -s takeOnFails=true"
FULL_SCREEN="--start-fullscreen"
WHAT_TO_RUN=$(find ./test -type f -name "$1*.js")
TESTCAFE="testcafe chrome $TCAFE_OPT $FULL_SCREEN $CFG_JSON"

echo "I will run "$TESTCAFE $WHAT_TO_RUN;
$TESTCAFE $WHAT_TO_RUN