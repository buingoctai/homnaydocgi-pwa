import React, { useEffect } from 'react';
import { saveSubscription } from './services/Notification';

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
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function () {
        console.log('Service Worker Registered');
        // Handle notifications
        Notification.requestPermission()
          .then((consent) => {
            console.log('consent', consent);
            if (consent != 'granted') return;
            createSubcription()
              .then((subscrition) => {
                console.log('subscrition', subscrition);
                saveSubscription(subscrition);
              })
              .catch(() => {});
          })
          .catch(() => {});
        getUserSubscription()
          .then((sub) => {
            console.log('get subscription', sub);
          })
          .catch(() => {
            console.log('get error');
          });
      });
    }
    let deferredPrompt;
    const addBtn = document.getElementById('btn-add');
    addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt');
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
  return (
    <div>
      <h1>Welcome to homnaydocgi app</h1>
      <button id="btn-add">Add to home screen</button>
    </div>
  );
};

export default App;
