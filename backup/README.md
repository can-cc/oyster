

# build
```
docker build .
```

# env
- BACKUP_HOST
- PGPASSWORD
- SEAFILE_API (example: https://seafile.com/api/v2.1/upload-links/xxxxx/upload/)
- BACKUP_TIME (example: 00:30)

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
