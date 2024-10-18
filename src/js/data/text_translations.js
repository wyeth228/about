/**
 * @typedef Translation
 * @property {string} en
 * @property {string} ru
 */

/**
 * @type {Object.<string, Translation>}
 */
export default {
  "main-header__a": {
    en: "contact me",
    ru: "связаться",
  },
  "info-about__main-text": {
    en: "Hello everyone and welcome!",
    ru: "Hello everyone and welcome!",
  },
  "info-about__paragraph": {
    en: "about: 🖥️full stack developer, 🖌️pixel artist, and a little bit🤏 of a graphic designer",
    ru: "об авторе: 🖥️full stack разработчик, 🖌️pixel art художник, а также, немножко🤏 графический дизайнер",
  },
  "resume-title": {
    en: "Resume",
    ru: "Резюме",
  },
  "portfolio-title": {
    en: "Portfolio",
    ru: "Портфолио",
  },
  "links-title": {
    en: "Links",
    ru: "Ссылки",
  },
  "resume-wrapper": {
    en: `
      <div class="resume-part">
        <p class="resume-part__title">Front end:</p>
        <p>- javascript (es5+), typescript</p>
        <p>- vue / vuex / nuxt.js / composition api</p>
        <p>- react / redux (little bit)</p>
        <p>- pixi.js / electron.js</p>
        <p>- scss / less</p>
        <p>- webpack</p>
        <p>- tailwindCSS / materializeCSS</p>
      </div>
      <div class="resume-part">
        <p class="resume-part__title">Back end:</p>
        <p>- php / node.js</p>
        <p>- mysql</p>
        <p>- socket.io / express</p>
        <p>- http / websockets</p>
        <p>- rest api / crud</p>
      </div>
      <div class="resume-part">
        <p class="resume-part__title">Other skills:</p>
        <p>- canvas</p>
        <p>- docker (little bit)</p>
        <p>- cross-browser compatibility / adaptive layout</p>
        <p>- unit testing (jest)</p>
        <p>- mvc / solid</p>
        <p>- git / github</p>
        <p>- bem</p>
        <p>- english B1</p>
      </div>`,
    ru: `
      <div class="resume-part">
        <p class="resume-title">Front end:</p>
        <p>- javascript (es5+), typescript</p>
        <p>- vue / vuex / nuxt.js / composition api</p>
        <p>- react / redux (немножко)</p>
        <p>- pixi.js / electron.js</p>
        <p>- scss / less</p>
        <p>- webpack</p>
        <p>- tailwindCSS / materializeCSS</p>
      </div>
      <div class="resume-part">
        <p class="resume-title">Back end:</p>
        <p>- php / node.js</p>
        <p>- mysql</p>
        <p>- socket.io / express</p>
        <p>- http / websockets</p>
        <p>- rest api / crud</p>
      </div>
      <div class="resume-part">
        <p class="resume-title">Other skills:</p>
        <p>- canvas</p>
        <p>- docker (немножко)</p>
        <p>- кроссбраузерность / адаптивность</p>
        <p>- unit testing (jest)</p>
        <p>- mvc / solid</p>
        <p>- git / github</p>
        <p>- bem</p>
        <p>- английский B1</p>
      </div>`,
  },
};
