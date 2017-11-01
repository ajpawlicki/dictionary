window.onload = () => {
  const textInput = document.getElementById('text-input');
  const form = document.getElementById('form');
  const list = document.getElementById('words-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (textInput.value.trim().length > 0) {

      fetch(`/getWords?txt=${textInput.value}`)
      .then(res => res.json())
      .then(data => {
        list.innerHTML = '';

        data.forEach(word => {
          const listItem = document.createElement('li');
          listItem.innerHTML = word;
          
          list.appendChild(listItem);
        });
      });

    }

  });
};