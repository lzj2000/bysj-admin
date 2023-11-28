import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './util/http';
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'antd'
import zhCN from "antd/es/locale/zh_CN";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 状态管理
import { Provider } from "react-redux"
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

dayjs.locale('zh-cn');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
