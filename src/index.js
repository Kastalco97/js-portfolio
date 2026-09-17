import Template from '@templates/Template.js';
import '@styles/main.css';
import '@styles/vars.styl';

(async function App() {
  console.log('Introducte el nombreee');
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
