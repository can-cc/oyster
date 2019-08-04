FROM debian:buster

WORKDIR /filebeat

COPY ./filebeat /filebeat/filebeat
COPY ./module/ /filebeat/module
COPY ./modules.d/ /filebeat/modules.d
COPY ./filebeat.yml /filebeat/filebeat.yml


CMD ["/filebeat/filebeat", "-e", "-c", "./filebeat.yml"]
