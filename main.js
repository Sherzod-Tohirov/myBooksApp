import { books } from './src/data.js';



const template = document.querySelector('.js-temp');
const notFoundTemplate = document.querySelector('.js-not-found-temp');
const fragment = new DocumentFragment();
const list = document.querySelector('.js-list');
const selectLang = document.querySelector('.js-lang-sort');
const langs = books.reduce((acc, item) => {
      if(!acc.includes(item.language)) acc.push(item.language);
      return acc;
}, []);

render(books, list);
renderLangSelect(langs, selectLang);

const searchName = document.querySelector('.js-search');
searchName.addEventListener('keyup', evt => {
  const filteredBooks = books.filter(item => item.title.toLowerCase().startsWith(searchName.value.trim().toLowerCase()));
  render(filteredBooks, list);
});

const orderSort = document.querySelector('.js-order-sort');
orderSort.addEventListener('change', (evt) => {
   if(evt.target.value === 'asc') {
         const filteredBooks = books.sort((a, b) => {
         const first = a.title.trim().toLowerCase();
         const second = b.title.trim().toLowerCase();

         if(first < second) return -1;
         else if(first > second) return 1;
         else return 0; 
      });

      render(filteredBooks, list);
   }

   if(evt.target.value === 'desc') {
      const filteredBooks = books.sort((a, b) => {
      const first = a.title.trim().toLowerCase();
      const second = b.title.trim().toLowerCase();

      if(first < second) return 1;
      else if(first > second) return -1;
      else return 0;
   });

   render(filteredBooks, list);

}
});


selectLang.addEventListener('change', (evt) => {
    const filteredBooks = books.filter(item => item.language === evt.target.value);
    render(filteredBooks, list); 
});






















function renderLangSelect(langs, node) {
  node.innerHTML = '';

  langs.forEach((item, index) => {
       if(index == 0) {
        const option = document.createElement('option');
        option.textContent = 'Choose a language';
        option.setAttribute('hidden', '');
        fragment.append(option);
       }
       const option = document.createElement('option');
       option.textContent = item;
       option.value = item;
       fragment.append(option);
  });

  node.appendChild(fragment);
}


function render(arr, node) {
  node.innerHTML = '';

  if(!arr.length) {
    node.appendChild(notFoundTemplate.content.cloneNode(true));
    return;
  }

  arr.forEach(item => {
    const temp = template.content.cloneNode(true);

    temp.querySelector('.js-img').src = item.imageLink;
    temp.querySelector('.js-img').alt = item.title;
    temp.querySelector('.js-author').textContent = `🤵Author: ${item.author}`;
    temp.querySelector('.js-country').textContent = `🎌Country: ${item.country}`;
    temp.querySelector('.js-lang').textContent = `🛬Language: ${item.language}`;
    temp.querySelector('.js-title').textContent = `✍️Title: ${item.title}`;
    temp.querySelector('.js-pages').textContent = `📕Pages: ${item.pages}`;
    temp.querySelector('.js-year').textContent = `🕧Year: ${item.year}`;
    fragment.appendChild(temp);
  });

  node.appendChild(fragment);
}