#
#   Pre Build Script
#


# Build time as version
VITE_VER=$(TZ=Europe/London date +%Y.%m.%d.%H%M)
export VITE_VER

# Commit SHA
VITE_COMMIT_SHA="$CF_PAGES_COMMIT_SHA"
export VITE_COMMIT_SHA

# NPM Build
npm run build:app

# Put version number in www/version.txt
echo "$VITE_VER" > build/version.txt