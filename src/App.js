import './App.css';
import {Content} from './components/content';
import {Footer} from './components/footer';
import {Header} from './components/header';

function App() {
  return (
      <div className='wrapper'>
        <Header />
        <Content />
        <Footer />
      </div>
  );
}

export default App;
