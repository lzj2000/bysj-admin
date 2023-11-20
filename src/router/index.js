import React, { lazy } from "react"
// Navigate重定向组件
import { Navigate } from "react-router-dom"

import Login from '../views/login/Login'
import SandBox from '../views/sandbox/SandBox'
const Home = lazy(() => import('../views/sandbox/home/Home'))
const AgentList = lazy(() => import('../views/sandbox/agent/AgentList'))
const AddAgent = lazy(() => import('../views/sandbox/agent/AddAgent'))
const AddressList = lazy(() => import('../views/sandbox/address/AddressList'))
const AddAddress = lazy(() => import('../views/sandbox/address/AddAddress'))
const UserList = lazy(() => import('../views/sandbox/user/UserList'))
const TakerList = lazy(() => import('../views/sandbox/user/TakerList'))
const IsTaker = lazy(() => import('../views/sandbox/user/IsTaker'))
const Delivery = lazy(() => import('../views/sandbox/order/Delivery'))
const Other = lazy(() => import('../views/sandbox/order/Other'))
const Errand = lazy(() => import('../views/sandbox/order/Errand'))
const Repair = lazy(() => import('../views/sandbox/order/Repair'))
const Nopermission = lazy(() => import('../views/sandbox/nopermission/Nopermission'))

// 报错A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. 
// 懒加载的模式的组件的写法，外面需要套一层 Loading 的提示加载组件


const withLoadingComponent = (comp) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
  </React.Suspense>
)

const routes = [
  //  嵌套路由 开始-------------------
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/",
    element: <SandBox />,
    children: [
      {
        path: "/home",
        element: withLoadingComponent(<Home />)
      },
      {
        path: "/agent/agentlist",
        element: withLoadingComponent(<AgentList />)
      },
      {
        path: "/agent/addagent",
        element: withLoadingComponent(<AddAgent />)
      },
      {
        path: "/address/addresslist",
        element: withLoadingComponent(<AddressList />)
      },
      {
        path: "/address/addaddress",
        element: withLoadingComponent(<AddAddress />)
      },
      {
        path: "/user/userlist",
        element: withLoadingComponent(<UserList />)
      },
      {
        path: "/user/takerlist",
        element: withLoadingComponent(<TakerList />)
      },
      {
        path: "/user/istaker",
        element: withLoadingComponent(<IsTaker />)
      },
      {
        path: "/order/delivery",
        element: withLoadingComponent(<Delivery />)
      },
      {
        path: "/order/other",
        element: withLoadingComponent(<Other />)
      },
      {
        path: "/order/errand",
        element: withLoadingComponent(<Errand />)
      },
      {
        path: "/order/repair",
        element: withLoadingComponent(<Repair />)
      },
      {
        path: "/Nopermission",
        element: withLoadingComponent(<Nopermission />)
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <Navigate to="/Nopermission" />
  }
]

export default routes