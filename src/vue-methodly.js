const VueMethodly = {
  install: (Vue, options) => {
    // initialise hook methods
    let hooks = {
      beforeCreate: [],
      created: [],
      beforeMount: [],
      mounted: [],
      update: [],
      activated: [],
      deactivated: [],
      beforeDestroy: [],
      destroyed: []
    }

    // map methods to each hook from options
    Object.keys(hooks)
      .forEach(hookKey => {
        let hasMethods = options.methods && options.methods.length

        hooks[hookKey] = (hasMethods &&
          options.methods.filter(method => {
            // ignore attemps to use in-built method names
            return method.hook === hookKey &&
              !Object.keys(hooks).includes(method.name)
          })) || []
      })

    // helper method to iterate over each
    // hook method and fire it off
    const enableHookMethods = (vm, hook) => {
      hooks[hook].forEach(method => {
        const hookMethod = vm.$options[method.name] || false
        hookMethod && hookMethod.call(vm)
      })
    }

    // create a simple mixin and call each of the hook's methods
    // in the order they are found provided the options during init
    Vue.mixin({
      beforeCreate () { enableHookMethods(this, 'beforeCreate') },
      created () { enableHookMethods(this, 'created') },
      beforeMount () { enableHookMethods(this, 'beforeMount') },
      mounted () { enableHookMethods(this, 'mounted') },
      update () { enableHookMethods(this, 'update') },
      activated () { enableHookMethods(this, 'activated') },
      deactivated () { enableHookMethods(this, 'deactivated') },
      beforeDestroy () { enableHookMethods(this, 'beforeDestroy') },
      destroyed () { enableHookMethods(this, 'destroyed') }
    })
  }
}

export default VueMethodly
