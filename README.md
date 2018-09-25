# Vue Methodly

A simple Vue plugin to augment your Vue instance methods with custom ones

## Install

### NPM/Yarn

```bash
npm install vue-methodly --save
```

or

```bash
yarn add vue-methodly --save
```

### Browser

```html
<script src="https://unpkg.com/vue-methodly"></script>
```

## Usage

### Webpack

```js
import VueMethodly from 'vue-methodly'
...
Vue.use(VueMethodly, {
  methods: [
    {
      // the name of your custom method
      name: 'myCustomMethod',

      // the native hook on which to execute
      hook: 'mounted'
    },
    ...
  ]
})
...
```

```js
// some component
...
export default {
  ...
  // gets executed before the native mounted() hook
  myCustomMethod () {
    // whatever you like here
  },
  ...
}
...
```

### Browser

```js
Vue.use(VueMethodly, {
  methods: [
    {
      // the name of your custom method
      name: 'myCustomMethod',

      // the hook before which to execute
      hook: 'mounted'
    },
    ...
  ]
})
```

```js
Vue.component('MyComponent', {
  ...
  // gets executed before the native mounted() hook
  myCustomMethod () {
    // whatever you like here
  },
  ...
})
```

## Example
https://jsfiddle.net/yprbeh5f/
