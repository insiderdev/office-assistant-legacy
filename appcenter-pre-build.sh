#!/usr/bin/env bash
#
# For Android app, updates the contents of the google-service.json file.

if [ ! -n "$GOOGLE_SERVICES_JSON" ]
then
    echo "You need define the GOOGLE_SERVICES_JSON variable in App Center"
    exit
fi

# This is the path to the google-services.json file, Update 'Android' to be the
# correct path to the file relative to the root of your repo
GOOGLE_SERVICES_JSON_FILE=$APPCENTER_SOURCE_DIRECTORY/Android/google-services.json

if [ -e "$GOOGLE_SERVICES_JSON_FILE" ]
then
    echo "Updating google-services.json"
    echo "$GOOGLE_SERVICES_JSON" > $GOOGLE_SERVICES_JSON_FILE
    sed -i -e 's/\\"/'\"'/g' $GOOGLE_SERVICES_JSON_FILE

    echo "File content:"
    cat $GOOGLE_SERVICES_JSON_FILE
fi
