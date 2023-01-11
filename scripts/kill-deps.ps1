$root = "${PSScriptRoot}/../"

rm -r -f "${root}/node_modules"
rm -r -f "${root}/yarn.lock"

rm -r -f "${root}/packages/server-services/node_modules"
rm -r -f "${root}/packages/server-api/node_modules"
rm -r -f "${root}/packages/tests-client/node_modules"
rm -r -f "${root}/packages/commonlogic/node_modules"
rm -r -f "${root}/packages/commontypes/node_modules"
rm -r -f "${root}/packages/communication/node_modules"
rm -r -f "${root}/packages/frontend/node_modules"