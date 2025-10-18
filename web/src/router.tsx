import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SearchView from './pages/SearchView';
import RequirementDetail from './pages/RequirementDetail';
import RequirementEditor from './pages/RequirementEditor';
import Metrics from './pages/Metrics';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <SearchView />,
      },
      {
        path: 'r/:id',
        element: <RequirementDetail />,
      },
      {
        path: 'new',
        element: <RequirementEditor />,
      },
      {
        path: 'r/:id/edit',
        element: <RequirementEditor />,
      },
      {
        path: 'metrics',
        element: <Metrics />,
      }
    ],
  },
]);