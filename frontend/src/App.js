import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ModalProvider from './modalProvider/modalProvider';
import reduxStore from './modules/configureStore';
// import AuthRoute from './pages/Auth/AuthRoute';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import JoinForm from './pages/Join/JoinForm';
import MyPage from './pages/MyPage';
import Download from './pages/Download';
import DownloadDetail from './pages/DownloadDetail';
import UserInfo from './pages/UserInfo';
import DownloadHistory from './pages/DownloadHistory';
import UploadHistory from './pages/UploadHistory';
import Upload from './pages/Upload';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <Provider store={reduxStore}>
      <ModalProvider />
      <Router>
        <DefaultLayout>
          {/* <AuthRoute exact path="/blockfish" type="private">
        <Main />
        </AuthRoute> */}
          <Route exact path="/blockfish" component={Main} />
          <Route exact path="/blockfish/download" component={Download} />
          <Route path="/blockfish/download/detail/:id" component={DownloadDetail} />
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
          <Route path="/join-form" component={JoinForm} />
          {/* <AuthRoute exact path="/my-page" type="guest">
          <MyPage />
        </AuthRoute> */}
          <Route exact path="/my-page" component={MyPage} />
          <Route exact path="/my-page/userinfo" component={UserInfo} />
          <Route exact path="/my-page/review" component={UserInfo} />
          <Route exact path="/my-page/withdrawal" component={UserInfo} />
          <Route exact path="/my-page/history/download" component={DownloadHistory} />
          <Route exact path="/my-page/history/upload" component={UploadHistory} />
          <Route exact path="/my-page/upload" component={Upload} />
        </DefaultLayout>
      </Router>
    </Provider>
  );
}

export default App;
