import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AppLayout from './AppLayout';
import AppProvider from './AppProvider';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App; 