# how create custom filebeat

``` bash
./filebeat export template > filebeat.template.json
```

``` bash
 curl -X PUT "http://192.168.50.xxx:9200/_template/filebeat-mactest" -H 'Content-Type: application/json' -d@filebeat.template.json
```