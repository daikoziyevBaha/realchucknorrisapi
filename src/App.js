import './App.css';
import {Content} from './components/content';
import ContentClass from './components/contentclass';
import Footer from './components/footer';
import Header from './components/header';



function App() {
  return (
      <div className='wrapper'>
        <Header />
        <ContentClass />
        {/* <Content /> */}
        <Footer />
      </div>
  );
}

export default App;
