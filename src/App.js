import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import {countries} from './countries.js'
import './script.js'
function App() {
  return (
    <div className="App">
      <header>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/iconNext.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
             <b>Pyong Translate</b>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <main>
        <ul class="controls">
          <li class="row from">
            <div class="icons">
              <i id="from" class="fas fa-volume-up"></i>
              <i id="from" class="fas fa-copy"></i>
            </div>
            <select></select>
          </li>
          <li class="exchange"><i class="fas fa-exchange-alt"></i></li>
          <li class="row to">
            <select></select>
            <div class="icons">
              <i id="to" class="fas fa-volume-up"></i>
              <i id="to" class="fas fa-copy"></i>
            </div>
          </li>
        </ul>
        <div className="text-input">
          <textarea spellCheck="false" className="from-text" placeholder="Enter text"></textarea>
          <textarea spellCheck="false" readOnly disabled className="to-text" placeholder="Translation"></textarea>
        </div>
        <Button variant="success" className="translateBtn" type="submit" id="translate-btn" >Translate Text</Button>
      </main>
    </div>
  );
}

export default App;
