# Tiptoi Manager PWA

Tiptoi manager is a Webapplication to manage your [Tiptoi](https://www.ravensburger.de/de-DE/entdecken/tiptoi) files.

It allows you to find and download audio files for your Tiptoi books and games and directly install them on your Tiptoi pen:

https://tiptoi-manager.nico.dev/

## Technical details

### Installable PWA
This webapp is a [Progressive Web App](https://web.dev/progressive-web-apps/) and can be installed on your device.  
It uses a webapp manifest (generated by [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)) to present itself as an installable PWA to the browser.

### Offline support
It also comes with a service worker (generated by [WorkboxJS](https://developer.chrome.com/docs/workbox/)) to cache all assets and make the app available offline.  
Furthermore, all downloaded audio files are cached and can be used offline.

The webapp is also using the [Persistent Storage API](https://web.dev/articles/persistent-storage) to ensure that data stored by the app is not deleted by the browser.

### Connection to the pen
The connection to the pen is established via the [File System API](https://developer.chrome.com/articles/file-system-access/). The pen presents itself as an USB mass storage device to the operating system. The webapp then tries to access the volume and read the files from it. To install new audio files it writes the new files to the pen directory.