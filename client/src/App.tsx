import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/Home'
import BooksPage from './pages/Books'
import AuthorsPage from './pages/Authors'
import GenresPage from './pages/Genres'
import Layout from './components/layout'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "books", element: <BooksPage /> },
        { path: "authors", element: <AuthorsPage /> },
        { path: "genres", element: <GenresPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App
