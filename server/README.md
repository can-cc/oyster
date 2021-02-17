
## Database


## generate auth token


## reset redis all BloomFilter data

``` bash
redi-cli flushall
```

## mysql docker 
``` bash
docker run --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

```bash
docker run --name redis -p 6379:6379 -d redis
```