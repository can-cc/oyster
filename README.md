## Deploy
#+BEGIN_SRC bash
docker-compose up
#+END_SRC

## config
default config in `config/config.yaml`, it store in git, please do not motifiy it.

you can change config in `config/config.custom.yaml`, it will override `config/config.yaml`

otherwise, you can change config in env variables, it will override 

### Log
log file write to ./log dir

### db
use sqlite3, initial in ./db dir
