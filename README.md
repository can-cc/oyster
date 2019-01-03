## Deploy

``` bash
docker-compose up
```

### create user

example to create new user foo/password

```bash
 docker-compose exec backend /bin/bash
```

``` bash
./node_modules/.bin/ts-node src/tool/create-user.ts foo password
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

