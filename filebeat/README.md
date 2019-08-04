# how build image

根据下面的官方文档在 go 的工作区间里面下载 beats 源码，然后生成 oyster 模块（module）
[https://www.elastic.co/guide/en/beats/devguide/current/filebeat-modules-devguide.html](https://www.elastic.co/guide/en/beats/devguide/current/filebeat-modules-devguide.html)

然后把这个文件夹的目录覆盖进去，`docker build .` 即可

# how use docker image

``` bash
docker run --rm \
-e ES_HOSTS="'es.xx.com:443'" \
-e ES_USERNAME="basic username" \
-e ES_PASSWORD="basic password" \
-v ../log:/var/log/oyster \
2418200a2d13
```
