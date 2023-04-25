import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import {countries} from './countries.js'
// import './script.js'
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

function script() {
  const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchageIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i");
  translateBtn = document.querySelector("button"),

  selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
          let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "nl-NL" ? "selected" : "";
          let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
          tag.insertAdjacentHTML("beforeend", option);
      }
  });

  exchageIcon.addEventListener("click", () => {
      let tempText = fromText.value,
      tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
  });

  fromText.addEventListener("keyup", () => {
      if(!fromText.value) {
          toText.value = "";
      }
  });

  translateBtn.addEventListener("click", () => {
      let text = fromText.value.trim(),
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
      if(!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl).then(res => res.json()).then(data => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach(data => {
              if(data.id === 0) {
                  toText.value = data.translation;
              }
          });
          toText.setAttribute("placeholder", "Translation");
      });
  });

  icons.forEach(icon => {
      icon.addEventListener("click", ({target}) => {
          if(!fromText.value || !toText.value) return;
          if(target.classList.contains("fa-copy")) {
              if(target.id == "from") {
                  navigator.clipboard.writeText(fromText.value);
              } else {
                  navigator.clipboard.writeText(toText.value);
              }
          } else {
              let utterance;
              if(target.id == "from") {
                  utterance = new SpeechSynthesisUtterance(fromText.value);
                  utterance.lang = selectTag[0].value;
              } else {
                  utterance = new SpeechSynthesisUtterance(toText.value);
                  utterance.lang = selectTag[1].value;
              }
              speechSynthesis.speak(utterance);
          }
      });
  });
}

export default { App, script } ;
