

# build
```
docker build .
```

# env
- BACKUP_HOST
- PGPASSWORD
- SEAFILE_API (example: https://seafile.com/api/v2.1/upload-links/xxxxx/upload/)
- SEAFILE_TOKEN seafile auth token
- BACKUP_TIME (example: 00:30)
- RUN_NOW

# how get token


## get Authorization token
```
curl -d "username=[seafile username]&password=[seafile password]" https://[seafile domain]/api2/auth-token/
```

it will get token `xxxxx_xxx`

## get upload links
```
curl -H 'Accept: application/json; indent=4'  -H  'Authorization: Token xxxxx_xxx'  "https://[seafile domain]/api/v2.1/upload-links/"
```


# docker command

``` bash
docker run \
-e BACKUP_HOST="172.17.0.4" \
-e PGPASSWORD="mysecretpassword" \
-e SEAFILE_API="https://seafile.xx.com/api/v2.1/upload-links/xxx/upload/" \
-e BACKUP_TIME="00:30" -e SEAFILE_TOKEN="xxx" \
-e RUN_NOW="true" \
fwchen/postgreseafile-backup:latest
```
