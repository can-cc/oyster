# how build image

[https://www.elastic.co/guide/en/beats/devguide/current/filebeat-modules-devguide.html]

# how use docker image

``` bash
docker run --rm \
-e ES_HOSTS="'es.xx.com:443'" \
-e ES_USERNAME="basic username" \
-e ES_PASSWORD="basic password" \
-v ../log:/var/log/oyster \
2418200a2d13
```