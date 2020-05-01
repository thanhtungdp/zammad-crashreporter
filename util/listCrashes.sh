#!/bin/bash

# Verbose the last 10 crashes reported
# Usage: ./listCrashes.sh <db-file>
# Exanion 2020

if [ -z "$1" ]
  then
    echo "Usage: ./listCrashes.sh <db-file>"
    exit 1;
fi

echo "Count of crashes stored: " `sqlite3 "$1" "SELECT COUNT(id) FROM crashes;"`

echo ""

sqlite3 "$1" -cmd ".mode column" ".headers on" "SELECT id, receivedDate, reportedDate, fingerprint, version, build, license, errorMsg, errorFile, errorLine FROM crashes"