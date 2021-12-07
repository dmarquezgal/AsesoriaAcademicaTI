//Check Service Worker
let newServiceWorker;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registerEvent => {
        registerEvent.addEventListener('updatefound', () => {
          newServiceWorker = registerEvent.installing;
          newServiceWorker.addEventListener('statechange', () => {
            switch (newServiceWorker.state) {
              case 'installed':
                showSnackbarUpdate();
                break;
            }
          });
        });
      })
      .catch(function (err) {
        console.log('ServiceWorker failed', err);
      });
  });
}

//API


//Snackbar
function showSnackbarUpdate() {
  var x = document.getElementById("snackbar");
  x.className = "show";
}

let launchUpdate = document.getElementById('launchUpdate');
launchUpdate.addEventListener('click', () => {
  newServiceWorker.postMessage({
    action: 'skipWaiting',
  });
  window.location.reload();
});