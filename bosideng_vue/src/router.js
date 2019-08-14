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
import carousel from './components/Carousel'
import Header from './components/Header'
// import fixed from './views/fixed' 

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/hello',component:HelloContainer},
    {path:'/header',component:Header},
    {path:'/',component:Index},
    {path:'/lady',component:Lady},
    {path:'/shoppingCar',component:ShoppingCar},
    {path:'/select',component:select},
    {path:'/carousel',component:carousel},
    // {path:'/fixed',component:fixed},
    {path:'*',component:NotFound},
    
  ]
})
