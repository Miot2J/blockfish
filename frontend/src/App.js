import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reduxStore from './modules/configureStore';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import MyPage from './pages/MyPage';
import Download from './pages/Download';
import DownloadDetail from './pages/DownloadDetail';
import UserInfo from './pages/UserInfo';
import DownloadHistory from './pages/DownloadHistory';
import UploadHistory from './pages/UploadHistory';
import Upload from './pages/Upload';

function App() {
  return (
    <Provider store={reduxStore}>
      <Router>
        <Route exact path="/blockfish" component={Main} />
        <Route exact path="/blockfish/download" component={Download} />
        <Route path="/blockfish/download/detail/:id" component={DownloadDetail} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Route exact path="/my-page" component={MyPage} />
        <Route path="/my-page/userinfo" component={UserInfo} />
        <Route path="/my-page/review" component={UserInfo} />
        <Route path="/my-page/withdrawal" component={UserInfo} />
        <Route exact path="/my-page/history/download" component={DownloadHistory} />
        <Route exact path="/my-page/history/upload" component={UploadHistory} />
        <Route exact path="/my-page/upload" component={Upload} />
      </Router>
    </Provider>
  );
}

export default App;
