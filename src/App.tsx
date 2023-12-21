import 'antd/dist/antd.min.css';
import './App.css';
import RouteNavigate from './assets/components/Route/Route';

const App: React.FC = () => {
  return (
    <div className="App">
      <RouteNavigate
        loggedIn={false}
        handleLogin={function (email: string, password: string | number): Promise<void> {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
}

export default App;