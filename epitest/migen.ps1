
echo ${PWD}/imagedir
docker buildx build -o type=tar,dest=migen.tar ../ -f ../config/migen.Dockerfile -t migen