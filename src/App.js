import './App.css';
import Router from './RoutingModule';
import { Provider } from 'react-redux';
import store from './App/Store';

function App() {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}

export default App;