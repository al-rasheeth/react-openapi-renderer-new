import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { QueryProvider, ThemeProvider } from './providers';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App; 