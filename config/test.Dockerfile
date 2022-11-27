FROM ubuntu

RUN apt-get update
RUN apt-get --assume-yes --force-yes install telnet
RUN apt-get install -y postgresql-client

# CMD "psql --dbname localhostDB -U dev_service_user -h 172.21.0.2"

# RUN apk update
# RUN apk add busybox-extras

# CMD "ping 127.0.0.1";"telnet 127.0.0.1 7014";"telnet 127.0.0.1 5432";"telnet localhost 5432";"telnet 0.0.0.0 5432";