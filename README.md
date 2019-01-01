## Deploy

``` bash
docker-compose up
```

## config
default config in `config/config.yaml`, it store in git, please do not motifiy it.

you can change config in `config/config.custom.yaml`, it will override `config/config.yaml`

otherwise, you can change config in env variables, it will override 

| Name                  | Description                    | Default |
|-----------------------|--------------------------------|---------|
| VAPID_DETAIL_EMAIL    | vapid detail email             |         |



### Log
log file write to ./log dir

