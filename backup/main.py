import http.client
import requests
import gzip
import os
import schedule
import time
from datetime import datetime
import subprocess

def save_file_to_seafile(filename):
    print('start upload backup file to seafile')
    get_upload_api_request = requests.get(os.environ['SEAFILE_API'])
    upload_link = get_upload_api_request.json().get('upload_link')

    print('upload link is' + upload_link)

    data = {'file': open(filename, 'rb'), 'replace': 0, 'parent_dir': '/db',}
    
    headers = {'Authorization': 'Token %s' % os.environ['SEAFILE_TOKEN']}
    upload_request = requests.post(upload_link, files=data, headers=headers)
    print('response code = ' + str(upload_request.status_code))
    if (upload_request.status_code == 200):
        print('backup to seafile successful')

def remove_file(filename):
    os.remove(filename)
    print('file removed')

def backup_postgres():
    today = "{:%Y-%m-%d}".format(datetime.now())
    print('%s start backup' % today)
    filename = '%s.gz' % today

    with gzip.open(filename, 'wb') as f:
        popen = subprocess.Popen(["pg_dump", "-h", (os.environ['BACKUP_HOST']), "-U", "postgres", "postgres"], stdout=subprocess.PIPE, universal_newlines=True)

        for stdout_line in iter(popen.stdout.readline, ""):
            f.write(stdout_line.encode("utf-8"))

        popen.stdout.close()
        popen.wait()

    save_file_to_seafile(filename)
    remove_file(filename)

def start_backup():
    schedule.every().day.at(os.environ['BACKUP_TIME']).do(backup_postgres)

    while 1:
        schedule.run_pending()
        time.sleep(1)

def main():
    start_backup()

if __name__ == '__main__':
    main()