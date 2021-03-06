/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BK705gqKMzd2Le-telG6sWsu1RIFPa8Vu_FHTBB853Z2sTeey35QW4BgqwBzPswmPIHI1AOPyjyRK4GU01VForw';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      onPushConsole('User IS subscribed.');
    } else {
      onPushConsole('User is NOT subscribed.');
    }

  });
}
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    onPushConsole('User is subscribed:', subscription);
    onJsonConsole(JSON.stringify(subscription));

    isSubscribed = true;

  })
  .catch(function(err) {
    onPushConsole('Failed to subscribe the user: ', err);
  });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  onPushConsole('Service Worker and Push is supported');

  navigator.serviceWorker.register('service_worker.js')
  .then(function(swReg) {
    onPushConsole('Service Worker is registered', swReg);

    swRegistration = swReg;
    swRegistration.onupdatefound = function() {
      onPushConsole('????????????????????????????????????');
      swRegistration.update();
    }


    navigator.serviceWorker.register('service_worker.js')
    .then(function(swReg) {
      onPushConsole('Service Worker is registered', swReg);

      swRegistration = swReg;
      initialiseUI();
    })
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      onPushConsole('User is subscribed:', JSON.stringify(subscription));
      onJsonConsole(JSON.stringify(subscription));


      isSubscribed = true;


    })
    .catch(function(err) {
      onPushConsole('Failed to subscribe the user: ', err);
    });



  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

function onPushConsole(text, obj) {
    const cons = document.querySelector('#push-console');
    var content = cons.textContent;
    cons.textContent = content + "\n" + text;
    console.log("PushConsole:" + text);
    if (obj !== undefined) {
      console.dir(obj);
    }
}
function onJsonConsole(text, obj) {
    const cons = document.querySelector('#json-console');
    var content = cons.textContent;
    cons.textContent = content + "\n" + text;
    console.log("JsonConsole:" + text);
    if (obj !== undefined) {
      console.dir(obj);
    }
}

function reInstallServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration()
      .then(registration => {
        registration.unregister();
      });
    window.location.reload(true);
  }
}


