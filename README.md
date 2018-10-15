# TimerElement :watch:

This is a simple web component built using Angular Elements.

## :wrench: Dependencies

I have used these tools:

* Angular 6.1.8
* Angular CLI 6.2.3.
* Node.js 9.5.0
* npm 5.6.0

If you use different versions your could find some problems for installing it properly.


## :helicopter: Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
Here you will find the timer component and you can interact with it.
See how the component is reloaded if you change any of the source files.


## :house: Build

Run `ng build` to build the component files. 
The build artifacts will be stored in the `dist/timer-element` directory.

## :rocket: Use it

After building the custom element you can use it in your application and receive the 
timer value through the _timerValueUpdated_ event.

```javascript
const htmlElement = document.querySelector('custom-timer');

htmlElement.addEventListener('timerValueUpdated', (data) => { 
  // data.detail contains the timer value 
});
```

## Use cases
* :orange_book: [Plain HTML and JS](https://timer-html.firebaseapp.com)
* :green_book: [Vue.js](https://timer-vue.firebaseapp.com)
