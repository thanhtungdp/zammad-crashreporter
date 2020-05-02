#!/bin/bash

# Create a database file with the schema required for the app to work
# Usage: ./createEmptyDbFile.sh <output-path>
# Exanion 2020

if [ -z "$1" ]
  then
    echo "Usage: ./createEmptyDbFile.sh <output-path>"
    exit 1;
fi

sqlite3 "$1" "CREATE TABLE crashes (id INTEGER PRIMARY KEY AUTOINCREMENT, receivedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, reportedDate TIMESTAMP NOT NULL, fingerprint TEXT NOT NULL, deviceinfo TEXT DEFAULT NULL, version TEXT DEFAULT NULL, build TEXT DEFAULT NULL, license TEXT DEFAULT NULL, errorMsg TEXT DEFAULT NULL, errorFile TEXT DEFAULT NULL, errorLine INTEGER DEFAULT NULL, stacktrace TEXT DEFAULT NULL)"