
docker buildx build -o type=tar,dest=${PWD}/image/migen.tar ../ -f ../config/migen.Dockerfile -t migen