const VueMethodly = {
  install: (Vue, options) => {
    // initial hooks
    let hooks = {
      'beforeCreate': [],
      'created': [],
      'beforeMount': [],
      'mounted': [],
      'update': [],
      'activated': [],
      'deactivated': [],
      'beforeDestroy': [],
      'destroyed': []
    }

    // boolean helper
    let hasMethods = Array.isArray(options.methods)

    // bail if nothing to do
    if (!hasMethods) {
      return
    }

    // add methods to hooks
    Object.keys(hooks).map(hook => {
      // grab methods for this hook
      let methodsForHook = options.methods
        .filter(method => method.hook === hook)

      // add each one, so long as name does not collide with any native hooks
      methodsForHook.forEach(methodForHook => {
        if (!Object.keys(hooks).includes(methodsForHook)) {
          hooks[hook].push(methodForHook)
        }
      })
    })

    // reduce into only hooks which have methods
    const hooksWithMethods = Object.keys(hooks)
      .reduce((acc, hook) => {
        if (hooks[hook].length) {
          // first run, initialize
          if (!acc[hook]) {
            acc[hook] = []
          }

          // add to hook collection
          acc[hook].push(hooks[hook])
        }
        return acc
      }, {})

    // base mixin
    const mixin = {}

    // for each method in each hook with methods, execute the method
    // when the native hook executes, maintaining order in line with
    // defintions/config provided during init
    Object.keys(hooksWithMethods).forEach(hookWithMethods => {
      mixin[hookWithMethods] = function () {
        hooksWithMethods[hookWithMethods].forEach(hookWithMethods => {
          hookWithMethods.forEach(hookWithMethod => {
            const hookMethod = this.$options[hookWithMethod.name] || false
            hookMethod && hookMethod.call(this)
          })
        })
      }
    })

    // install mixin
    Vue.mixin(mixin)
  }
}

export default VueMethodly
