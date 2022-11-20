
# root 
Remove-Item '../node_modules' -Recurse -Force
Remove-Item '../yarn.lock' -Recurse -Force

# packages 
Remove-Item '../packages/backend/node_modules' -Recurse -Force
Remove-Item '../packages/backend/yarn.lock' -Recurse -Force

Remove-Item '../packages/frontend/node_modules' -Recurse -Force
Remove-Item '../packages/frontend/yarn.lock' -Recurse -Force

Remove-Item '../packages/commontypes/node_modules' -Recurse -Force
Remove-Item '../packages/commontypes/yarn.lock' -Recurse -Force

Remove-Item '../packages/commonlogic/node_modules' -Recurse -Force
Remove-Item '../packages/commonlogic/yarn.lock' -Recurse -Force

Remove-Item '../packages/communication/node_modules' -Recurse -Force
Remove-Item '../packages/communication/yarn.lock' -Recurse -Force

Remove-Item '../packages/indexExporter/node_modules' -Recurse -Force
Remove-Item '../packages/indexExporter/yarn.lock' -Recurse -Force

Remove-Item '../packages/pipelineGenerator/node_modules' -Recurse -Force
Remove-Item '../packages/pipelineGenerator/yarn.lock' -Recurse -Force

Remove-Item '../packages/scriptProducer/node_modules' -Recurse -Force
Remove-Item '../packages/scriptProducer/yarn.lock' -Recurse -Force

# install
cd ..
yarn
cd deploy