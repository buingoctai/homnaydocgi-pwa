import React, { useEffect, useState, } from 'react';
import { saveSubscription } from '../../services/Notification';

import './style.scss';
import Article from '../Article';
import Popover from 'srcRoot/pages/components/Popover';

import PopoverManager from 'srcRoot/pages/components/Popover/popover-manager';

const App = () => {
  const createSubcription = async () => {
    const pushServerPublicKey =
      'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8';

    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushServerPublicKey,
    });
  };
  const getUserSubscription = () => {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready
      .then(function (serviceWorker) {
        const r = serviceWorker.pushManager.getSubscription();
        return r;
      })
      .then(function (pushSubscription) {
        return pushSubscription;
      });
  };
  const [popover,setPopover] =useState({isShow: false, data:{}});

  useEffect(() => {
    PopoverManager.bindDispatch(setPopover);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function () {
        Notification.requestPermission()
          .then((consent) => {
            if (consent != 'granted') return;

            getUserSubscription()
              .then((sub) => {
                if (!sub) {
                  createSubcription()
                    .then((subscrition) => {
                      saveSubscription(subscrition);
                    })
                    .catch(() => {});
                }
              })
              .catch(() => {});
          })
          .catch(() => {});
      });
    }
    let deferredPrompt;
    const addBtn = document.getElementById('btn-add');
    // addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }, []);

  function getQueryStringValue(key) {
    if (!window.location.href.includes(`${process.env.APP_BASE}/article?`)) {
      return null;
    }
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp(
          '^(?:.*[&\\?]' +
            encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
            '(?:\\=([^&]*))?)?.*$',
          'i'
        ),
        '$1'
      )
    );
  }


  return (
    <>
      {/* <button id="btn-add" className="button-home">
        Add To Home Screen
      </button> */}
      <Article headArticle={getQueryStringValue('id')} />
      {popover.isShow && (
        <Popover newStyle={popover.data.style} child={popover.data.child}/>
      )}
    </>
  );
};

export default App;
