import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"



//对下面这些自己创建的组件进行路径的配置
// 每新建一个组件，就在这里导入，并为其创建一个接口
import Index from './views/Index'
import Lady from './views/Lady'
import ShoppingCar from './views/ShoppingCar'
import NotFound from './views/NotFound'
import select from './views/select'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/hello',component:HelloContainer},
    {path:'/',component:Index},
    {path:'/lady',component:Lady},
    {path:'/shoppingCar',component:ShoppingCar},
    {path:'/select',component:select},
    {path:'*',component:NotFound},
    
  ]
})
