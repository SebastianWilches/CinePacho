import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';
import { CineProvider } from './context/CineProvider';

function App() {
  return (
    <CineProvider>
      <AppRouter />
    </CineProvider>
  );

}

export default App;
