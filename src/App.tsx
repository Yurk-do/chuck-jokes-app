import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import HomePage from './components/pages/homePage/HomePage';
import JokesListPage from './components/pages/jokesListPage/jokesListPage';
import JokesPage from './components/pages/jokesPage/JokesPage';
import { useSelector } from 'react-redux';
import { StateType } from './types/types';

function App() {
  const isAuth = useSelector((state: StateType) => state.app.authStatus);

  return (
    <BrowserRouter>
      <div className='App'>
        <Route path={'/'} exact>
          <HomePage />
        </Route>
        {isAuth ? (
          <React.Fragment>
            <Route path={`/jokesListPage/:userName`} exact>
              <JokesListPage />
            </Route>
            <Route path={`/jokesListPage/:userName/:id`} exact>
              <JokesPage />
            </Route>
          </React.Fragment>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
