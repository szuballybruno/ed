FROM postgres

COPY ./pg-init-folder/init-database.sh /docker-entrypoint-initdb.d/init-database.sh
COPY ./init-sql /init-sql