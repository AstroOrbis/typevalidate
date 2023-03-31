#!/bin/bash

CURRENT_VERSION=$(node -p "require('./package.json').version")

echo "Current version is $CURRENT_VERSION"
echo "What type of release is this? (major, minor, patch)"
read RELEASE_TYPE
if [ "$RELEASE_TYPE" != "major" ] && [ "$RELEASE_TYPE" != "minor" ] && [ "$RELEASE_TYPE" != "patch" ]; then
	echo "Invalid release type"
	exit 1
fi

npm version $RELEASE_TYPE --no-git-tag-version

echo "Running tests and lints..."
npm test
npm lint

NEW_VERSION=$(node -p "require('./package.json').version")
echo "Releasing $NEW_VERSION"

git add * 
git commit -m "v$NEW_VERSION"
git push

sleep 2

gh release create 