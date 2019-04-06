# import firebase_admin
# from firebase_admin import credentials
#
# cred = credentials.Certificate('service-account.json')
# default_app = firebase_admin.initialize_app(cred)


import argparse
import json
import requests
import sys

from oauth2client.service_account import ServiceAccountCredentials

PROJECT_ID = 'sycs-climate'
BASE_URL = 'https://fcm.googleapis.com'
FCM_ENDPOINT = 'v1/projects/' + PROJECT_ID + '/messages:send'
FCM_URL = BASE_URL + '/' + FCM_ENDPOINT
SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']

with open('server-key.txt', 'r') as f:
    SERVER_KEY = f.read().strip()

def get_access_token():
  credentials = ServiceAccountCredentials.from_json_keyfile_name('service-account.json', SCOPES)
  access_token_info = credentials.get_access_token()
  return access_token_info.access_token


def send_message(target, notification, urgency):
    message = {
      "message": {
        "notification": {
          "title": notification['title'],
          "body": notification['body']
        },
        "webpush": {
          "headers": {
            "Urgency": ['very-low', 'low', 'normal', 'high'][urgency]
          },
          "notification": {
            "requireInteraction": "true",
            "badge": "/assets/sycs-logo-full.jpeg",
            "icon": "/assets/sycs-logo-full.jpeg",
            "click_action": notification['url']
          }
        }
      }
    }

    print('FCM request body for message using common notification object:')
    print(json.dumps(message, indent=2))
    print('')
    print('')

    if target['type'] == 'token':
        message['message']['token'] = target['token']
    elif target['type'] == 'topic':
        message['message']['topic'] = target['topic']

    headers = {
      'Authorization': 'Bearer ' + get_access_token(),
      'Content-Type': 'application/json; UTF-8',
    }

    resp = requests.post(FCM_URL, data=json.dumps(message), headers=headers)

    if resp.status_code == 200:
      print('Message sent to Firebase for delivery, response:')
      print(resp.text)
    else:
      print('Unable to send message to Firebase')
      print(resp.text)



def set_topic(token, topic):
    headers = {
      'Authorization': 'key=' + SERVER_KEY,
      'Content-Type': 'application/json; UTF-8',
    }
    resp = requests.post('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, headers=headers)
    if resp.status_code == 200:
      print('200 OK')
      print(resp.text)
    else:
      print('Error')
      print(resp.text)

def main():
    with open(sys.argv[1], 'r') as f:
        req = json.loads(f.read())
    if req['function'] == 'message':
        send_message(req['target'], req['notification'], req['urgency'])
    elif req['function'] == 'topic':
        set_topic(req['token'], req['topic'])

main()
