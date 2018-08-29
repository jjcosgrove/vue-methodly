# Vue Methodly

A simple Vue mixin to augment your Vue instance methods with custom ones

## Usage

```js
import VueMethodly from 'vue-methodly'
...
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
  }
  ...
}
...
```
