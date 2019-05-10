import http.client
import requests
import gzip
import pexpect
import os
import schedule
import time
from datetime import datetime


def save_file_to_seafile(filename):
    
    get_upload_api_request = requests.get(os.environ['SEAFILE_API'])
    upload_link = get_upload_api_request.json().get('upload_link')

    print('upload link is' + upload_link)

    data = {'file': open(filename, 'rb'), 'replace': 0,'parent_dir': '/db',}

    
    headers = {'Authorization': 'Token %s' % os.environ['SEAFILE_TOKEN']}
    upload_request = requests.post(upload_link, files=data, headers=headers)
    print('response code = ' + str(upload_request.status_code))
    if (upload_request.status_code == 200):
        print('backup to seafile successful')

def backup_postgres():
    today = "{:%Y-%m-%d}".format(datetime.now())
    print('%s start backup' % today)
    filename = '%s.gz' % today
    with gzip.open(filename, 'wb') as f:
        c = pexpect.spawn('pg_dump -h %s -U postgres postgres' % (os.environ['BACKUP_HOST']), timeout=300)
        f.write(c.read())
    save_file_to_seafile(filename)

def start_backup():
    schedule.every().day.at(os.environ['BACKUP_TIME']).do(backup_postgres)

    while 1:
        schedule.run_pending()
        time.sleep(1)

def main():
    backup_postgres()

if __name__ == '__main__':
    main()