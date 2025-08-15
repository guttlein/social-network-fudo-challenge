import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { ToastProvider } from '@/shared/contexts/ToastContext';
import { ToastContainer } from '@/shared/components';

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ToastProvider>
  );
}
