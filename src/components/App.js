import '../styles/App.css';
import Header from './Header';
import { useState } from 'react';
import UsersList from './UsersList';
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'
import Settings from './Settings';

function App() {

  const checkLocalStorage = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : []
  const [usersList, setUsersList] = useState(checkLocalStorage)
  const [searchedWord, setSearchedWord] = useState('')

  localStorage.setItem('usersList', JSON.stringify(usersList))

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={
          <>
            <div className="headerWrapper">
              <Header setWord={setSearchedWord} list={usersList} createUser={setUsersList} title="Project Access"/>
            </div>
            <UsersList term={searchedWord} list={usersList} updateList={setUsersList} />
          </>
        }>
        </Route>
        <Route 
          path=":id" 
          element={
            <>
            <div className="headerWrapper">
              <Header title="User Setup"/>
            </div>
            <Settings updateList={setUsersList} />
            </>
          }
        />
      </Route>
    )
  )
  return (
      <RouterProvider router={router} />
  );
}

export default App;
