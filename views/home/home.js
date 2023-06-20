const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const liked = JSON.parse(localStorage.getItem('liked')) || [];

// Cats
const container = document.querySelector('.container');
let row = document.createElement('div');
row.classList.add('row');
container.appendChild(row);
let col;
let count = 0;

catsJson.forEach((item, index) => {

  let isLiked = false;
  let isFavorited = false;

  document.querySelector('#favCont').innerHTML = `Favorito (${favorites.length})`
  
  let catsItem = document.createElement('div');
  catsItem.setAttribute('data-key', index);
  catsItem.innerHTML = `
    <div class="card mb-4 shadow-sm">
      <img src="${item.img}" class="card-img-top" alt="${item.name}" />
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary detail-button">Ver detalhes</button>
            <button type="button" class="btn btn-sm btn-outline-secondary favorite-btn favorito">Favoritar</button>
            <button type="button" class="btn btn-sm btn-outline-secondary like-btn curtir">Curtir</button>
          </div>
          <small class="text-muted">${item.gender}</small>
        </div>
      </div>
    </div>
  `;

  col = document.createElement('div');
  col.classList.add('col-md-4');
  col.appendChild(catsItem);
  row.appendChild(col);
  count++;

  if (count % 3 == 0) {
    row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
  }

  // Check if the current cat is already liked/favorited and update isLiked/isFavorited accordingly
  let key = liked.findIndex((cat) => cat.name === item.name);
  if (key !== -1) {
    isLiked = true;
    catsItem.querySelector('.like-btn').innerHTML = 'Descurtir'
    catsItem.querySelector('.like-btn').classList.add('btn-primary');
    catsItem.querySelector('.like-btn').style.color = '#000';
  } else {
    catsItem.querySelector('.like-btn').innerHTML = 'Curtir'
    isLiked = false;
  }

  key = favorites.findIndex((cat) => cat.name === item.name);
  if (key !== -1) {
  isFavorited = true;
    catsItem.querySelector('.favorite-btn').classList.add('btn-danger');
    catsItem.querySelector('.favorite-btn').style.color = '#000';
  } else {
  isFavorited = false;
  }
  

  catsItem.querySelector('.favorite-btn').addEventListener('click', (e) => {
    let key = e.target.closest('[data-key]').getAttribute('data-key');

    let data = {
      img: catsJson[key].img,
      name: catsJson[key].name,
      description: catsJson[key].description,
      gender: catsJson[key].gender
    };

    let index = favorites.findIndex((cat) => cat.name === data.name);
    if (index === -1) {
      // Se o gato não estiver nos favoritos, adiciona ao vetor
      favorites.push(data);
      isFavorited = true;
      e.target.classList.toggle('btn-danger');
      e.target.style.color = "#000";
    } else {
      // Se o gato já estiver nos favoritos, remove do vetor
      favorites.splice(index, 1);
      isFavorited = false;
      e.target.classList.toggle('btn-danger');
      e.target.style.color = "";
    }
    
    document.querySelector('#favCont').innerHTML = `Favorito (${favorites.length})`
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  catsItem.querySelector('.curtir').addEventListener('click', (e) => {
    let key = e.target.closest('[data-key]').getAttribute('data-key');
  
    let data = {
      img: catsJson[key].img,
      name: catsJson[key].name,
      description: catsJson[key].description
    };
  
    let index = liked.findIndex((item) => item.name === data.name);
    if (index === -1) {
      // Se o gato não estiver nos curtidos, adiciona ao vetor
      liked.push(data);
      isLiked = true;
      e.target.classList.toggle('btn-primary');
      e.target.style.color = "#000";
  
      // Update corresponding button on home page
      const homePageLikeBtn = document.querySelector(`[data-key="${key}"] .like-btn`);
      homePageLikeBtn.innerHTML = 'Descurtir';
      homePageLikeBtn.classList.add('btn-primary');
      homePageLikeBtn.style.color = '#000';
    } else {
      // Se o gato já estiver nos curtidos, remove do vetor
      liked.splice(index, 1);
      isLiked = false;
      e.target.classList.toggle('btn-primary');
      e.target.style.color = "";
  
      // Update corresponding button on home page
      const homePageLikeBtn = document.querySelector(`[data-key="${key}"] .like-btn`);
      homePageLikeBtn.innerHTML = 'Curtir';
      homePageLikeBtn.classList.remove('btn-primary');
      homePageLikeBtn.style.color = '';
    }
  
    localStorage.setItem("liked", JSON.stringify(liked));
  });
    
  catsItem.querySelector('.detail-button').addEventListener('click', (e) => {
    let key = e.target.closest('[data-key]').getAttribute('data-key');

    modal.querySelector('.img-fluid').src = catsJson[key].img;
    modal.querySelector('.col-md-6 h2').innerHTML = catsJson[key].name;
    modal.querySelector('.col-md-6 p').innerHTML = catsJson[key].description;

    // Update modal content based on whether the current cat is liked and/or favorited
    const modalFooter = document.querySelector('#productModal .modal-footer');
    modalFooter.innerHTML = "";

    if (isLiked) {
      modalFooter.innerHTML += '<button type="button" class="btn btn-primary like-btn" style="color: #000">Curtido</button>';
    } else {
      modalFooter.innerHTML += '<button type="button" class="btn btn-outline-secondary like-btn">Curtir</button>';
    }

    if (isFavorited) {
      modalFooter.innerHTML += '<button type="button" class="btn btn-danger favorite-btn" style="color: #fff">Favoritado</button>';
    } else {
      modalFooter.innerHTML += '<button type="button" class="btn btn-outline-danger favorite-btn">Favoritar</button>';
    }
  });
});

///////////////////////// HOME ////////////////////////////////////

const modal = document.querySelector('#productModal').cloneNode(true)
const myProductModal = new bootstrap.Modal(modal);

const detailButton = document.querySelectorAll(".detail-button");
detailButton.forEach(button => {
  button.addEventListener("click", () => {
    myProductModal.show();
  });
});

///////////////////////// LOGIN /////////////////////////////////////

const loginButton = document.querySelector('#loginButton');
const registerButton = document.querySelector('#registerButton');
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const registerModal = new bootstrap.Modal(document.querySelector('#registerModal'));
const newCatModal = new bootstrap.Modal(document.querySelector('#addCatModal'))

// Event listeners
loginButton.addEventListener('click', showLoginModal);
registerButton.addEventListener('click', showRegisterModal);
document.querySelector('#entrar').addEventListener('click', login);
document.querySelector('#registerButtonModal').addEventListener('click', register);

// Functions
function showLoginModal() {
  loginModal.show();
}

function showRegisterModal() {
  registerModal.show();
}

async function login(event) {
  event.preventDefault();
  const email = document.querySelector('#emailInput').value;
  const password = document.querySelector('#passwordInput').value;
  // implementar lógica de autenticação aqui

  const userInfo = {
    email,
    password
  }

  fetch('http://localhost:3000/login', {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(userInfo)
  })
    .then(response => response.json())
    .then(data => {
      // Aqui você pode manipular a resposta da requisição
      console.log(data);
      localStorage.setItem('token', data.token);
    })
    .catch(error => {
      // Aqui você pode lidar com erros na requisição
      console.error(error);
    });  

  loginModal.hide();
}

function register(event) {
  event.preventDefault();
  const name = document.querySelector('#nameInput').value;
  const email = document.querySelector('#emailInputRegister').value;
  const password = document.querySelector('#passwordInputRegister').value;
  const confirmPassword = document.querySelector('#confirmPasswordInputRegister').value;

  const userInfo = {
    name,
    email,
    password,
    confirmPassword
  }

  const token = localStorage.getItem('token');
  console.log(token)

  fetch('http://localhost:3000/user', {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userInfo)
  })
    .then(response => response.json())
    .then(data => {
      // Aqui você pode manipular a resposta da requisição
      console.log(data);
    })
    .catch(error => {
      // Aqui você pode lidar com erros na requisição
      console.error(error);
    });  

  // implementar lógica de registro aqui
  console.log(`Usuário ${name} registrado com sucesso!`);
  registerModal.hide();
}

const addCatButton = document.querySelector('#addCat');

addCatButton.addEventListener('click', () => {
  newCatModal.show();
});

let lastId = catsJson[catsJson.length - 1].id;


