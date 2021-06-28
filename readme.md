## Permission Vue
> Permission Vue is an RBAC-based ACL design that can be used on Vue2 and Vue3.

The permission-vue project is ACL focused and does nothing more than check whether a user has access. All pre-ACL and post-ACL treatment will be done by the user.

You can use `permission-vue` to protect your routes and also within your components.

The permission-vue project makes use of the [permission-engine](https://github.com/thiagoanselmo/permission-engine) project, which is how we have to write ACL schemes to check user roles.

### Install permission-vue
1. npm install permission-vue --save
2. yarn add permission-vue

```javascript

import permissionVue from 'permission-vue'

console.log(permissionVue)

// output from import      
{
 canAccess,
 ErrorPermissionACL,
 install,
 Instance,
 globalMixin,
 localMixin
}    

```


### Use `permission-vue`
The `permission-vue` package can be used in various ways, giving the developer a freedom to choose the way to use it according to his project.
Below we list the various ways to use the `permission-vue` package.

1. Adding an ACL instance to the Vue prototype
    ```javascript
     import Vue from 'vue'
     import permissionVue from 'permission-vue'
     
     // Create in Vue prototype property `$acl` 
     Vue.use(permissionVue);     
    ```
2. Using the management function.
    ```javascript
     import Vue from 'vue'
     import permissionVue from 'permission-vue'
      
     const userRoles = ['user', 'todo:edit'];
     const roles = [
       { $in: ['user'] }
     ]; 
     const canAccess =  permissionVue.canAccess(userRoles, roles);
     // output true   
    ```
3. Using management instance.
    ```javascript
     import Vue from 'vue'
     import permissionVue from 'permission-vue'
     
     const acl = new permissionVue.Instance();
   
     // Setter userRoles  
     acl.userRoles = ['user', 'todo:edit'];
   
     const roles = [
       { $in: ['user'] }
     ]; 
     
     // If using `userRoles` setter it is optional to pass the second parameter to the method, as it will use the rules of the `userRoles` setter`. 
     const canAccess = acl.canAccess(roles);
     // output true   
    ```
4. Using a global mixin in your components.
    
    VERY ATTENTION! We discourage you from using a global mixin as there can be performance degradation, but if your app is small or you're unsure of what you're doing, go ahead.

   ```javascript
   
    //
    // YOUR FILE BOOTSTRAP APPLICATION MAIN.JS
    //
    import Vue from 'vue'
    import permissionVue from 'permission-vue'
    
    permissionVue.globalMixin(Vue);
   
    //
    // YOUR COMPONENTS
    //   
    export default {
       name: 'XYZ',
       mixins: [permissionVue.localMixin],
   
       mounted () {
         const userRoles = ['user', 'todo:edit'];   
         const roles = [
           { $in: ['user'] }
         ]; 
           
         const canAccess = this.$canAccess(userRoles, roles);
         // output true
       }
     }
   ```
5. Using a local mixin in your components.
    
    //
    // YOUR COMPONENTS
    //
    ```javascript
     import permissionVue from 'permission-vue'
   
     export default {
       name: 'XYZ',
       mixins: [permissionVue.localMixin],
   
       mounted () {
         const userRoles = ['user', 'todo:edit'];   
         const roles = [
           { $in: ['user'] }
         ]; 
           
         const canAccess = this.$canAccess(userRoles, roles);
         // output true
       }
     }
    ```

### canAccess

#### 1. Adding an ACL instance to the Vue prototype

```javascript
    //
    // YOUR FILE BOOTSTRAP APPLICATION MAIN.JS
    //     
    import Vue from 'vue';
    import VuePermission from 'permission-vue';
    
    Vue.use(VuePermission);
    // add in Vue prototype `this.$acl`

    
    //
    // MUTATIION IN STORE (VUEX
    //
    import Vue from 'vue';
    
    // After login set user data in store and set user roles in $acl.userRoles
    function SET_SESSION (state, payload) {
      const { session, userData } = payload;
      state.session = session;
      state.userData = userData;
      
      // This is where you will set user roles in the $acl
      // User roles: ['user', 'page:mytodo', 'page:mytodo:create']
      Vue.prototype.$acl.userRoles = userData.roles;
    }

    //
    // YOUR FILE ROUTER.JS
    // 
    import VueRouter from 'vue-router';
    import permissionVue from 'permission-vue'
    
    const { ErrorPermissionACL } = permissionVue


    const Router = new VueRouter({
      scrollBehavior: () => ({ x: 0, y: 0 }),
      routes: [
        // No has ACL, is public
        { path: '/login', component: () => import('.../Login.vue') },

        // Has one ACL, $and
        { 
          path: '/todoList', 
          component: () => import('.../Todo.vue'),
          meta: {
            acl: {
              enable: true,
              roles: [
                {
                  $and: [
                    'user',
                    {$nin: ['page:mytodo']}
                  ]
                }
              ]
            }
          }
        },
        
        // Has one ACL, $and
        { 
          path: '/todoList/item/:id', 
          component: () => import('.../EditTodoItem.vue'),
          meta: {
            acl: {
              enable: true,
              roles: [
                {
                  $and: [
                    'user',
                    {$and: ['page:mytodo', 'page:mytodo:edit']}
                  ]
                }
              ]
            }
          }
        },

      ],
      mode: process.env.VUE_ROUTER_MODE,
      base: process.env.VUE_ROUTER_BASE
    });

    Router.beforeEach((to, from, next) => {
      const acl = Vue.prototype.$acl
      const hasACL = acl.checkHasACL(to)
       
      // Route is public, not have ACL
      if (!hasACL) {
        next()
        return
      }      

      /**
        Method canAccess allow two params.
        to - to from <VueRouter> is required;
        userRoles - Is array user roles is optional;
      */
      const canAccess = acl.canAccessRoute(to)
      if (!canAccess) next('/forbiddenAccess')
      else next()      
    })

    // route output /todoList -> true (Can access)
    // route output /todoList/item/:id -> true (Cannot access)


    //
    // METHOD CANACCESS IN COMPONENTS (Todo.vue)
    //
    <template>
        <p v-if=$acl.canAccess([{ $in: ['page:mytodo:edit'] }])>"You have access to edit"</p>
        <p v-if=$acl.canAccess([{ $in: ['page:mytodo:create'] }])>"You have access to create"</p>
    </template>
    
    
      
```


### Class Error `ErrorPermissionACL` 

The `ErrorPermissionACL` class is used to check the errors generated by the `permission-vue` package within your code, so you can have different decisions made.

#### Mode use `ErrorPermissionACL`

```javascript
    import { ErrorPermissionACL, canAccess } from 'permission-vue'

    const userRoles = ['admin'];
    const roles = [{ $in: ['admin'] }]
    try {
      const hasAccess = canAccess(userRoles, roles);
       ...
      // Your code continue 
    } catch (ex) {
      if (ex instanceof ErrorPermissionACL) cosole.error(ex.message);
      else throw ex;
    }
    
```