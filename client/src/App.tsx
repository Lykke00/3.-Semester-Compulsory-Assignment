import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import HomePage from './pages/Home'
import BooksPage from './pages/Books'
import AuthorsPage from './pages/Authors'
import GenresPage from './pages/Genres'

function App() {

  return (
        <RouterProvider router={createBrowserRouter([
            {
                path: '',
                element: <HomePage/>,
                children: [
                    {
                        path: 'books',
                        element: <BooksPage/>
                    },
                    {
                        path: 'authors',
                        element: <AuthorsPage/>
                    },
                    {
                        path: 'genres',
                        element: <GenresPage/>
                    }
                ]
            }
        ])}/>

  )
}

export default App
