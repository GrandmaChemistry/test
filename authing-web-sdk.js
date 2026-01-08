#使用 Yarn 安装
$ yarn add @authing/browser
import { Authing } from '@authing/browser';

const sdk = new Authing({
  domain: 'https://wong.authing.cn',// 应用的认证地址
  appId: '695f0afe3f11be56dbcfe03b',// 应用 ID
  redirectUri: 'https://grandmachemistry.github.io/test/',// 登录回调地址
});
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      domain: 'https://wong.authing.cn',
      appId: '695f0afe3f11be56dbcfe03b',
      redirectUri: 'https://grandmachemistry.github.io/test/',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  // 以跳转方式打开 Authing 托管的登录页

  const login = () => {
    sdk.loginWithRedirect();
  };

  // 获取用户的登录状态

  const getLoginState = useCallback(async () => {
    try {
      const state = await sdk.getLoginState();
      setLoginState(state);
    } catch(error) {
      console.log(error);
    }
  }, [sdk]);

  useEffect(() => {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (sdk.isRedirectCallback()) {
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 
       * handleRedirectCallback 方法，在回调端点处理 Authing 发送的
       * 授权码或 token，获取用户登录态
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      getLoginState();
    }
  }, [getLoginState, sdk]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>loginWithRedirect</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}
export default App;
const getLoginState = useCallback(async () => {
  try {
    const state = await sdk.getLoginState();
    setLoginState(state);
  } catch(error) {
    console.log(error);
  }
}, [sdk]);
