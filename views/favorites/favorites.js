var favorites = JSON.parse(localStorage.getItem("favorites"));
const container = document.querySelector('.container');
let isFavorited = false;
let catsItem;

console.log(container);

let row = document.createElement('div');
row.classList.add('row');
container.appendChild(row);

let col;
let count = 0;

favorites.forEach((item, index) => {
    catsItem = document.createElement('div');
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
              <button type="button" class="btn btn-sm btn-outline-secondary favorite-btn favorito btn-danger" style="color: #000">Desfavoritar</button>
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
  
    let key = favorites.findIndex((cat) => cat.name === item.name);
    if (key !== -1) {
      isFavorited = true;
    } else {
      isFavorited = false;
    }

    document.querySelector('#favCont').innerHTML = `Favorito (${favorites.length})`
  
    catsItem.querySelector('.detail-button').addEventListener('click', (e) => {
      let key = e.target.closest('[data-key]').getAttribute('data-key');
  
      document.querySelector('.img-fluid').src = favorites[key].img;
      document.querySelector('.col-md-6 h2').innerHTML = favorites[key].name;
      document.querySelector('.col-md-6 p').innerHTML = favorites[key].description;
  
      // Update modal content based on whether the current cat is favorited
      const modalFooter = document.querySelector('#productModal .modal-footer');
      modalFooter.innerHTML = "";
  
      if (isFavorited) {
        modalFooter.innerHTML += '<button type="button" class="btn btn-danger favorite-btn" style="color: #fff">Favoritado</button>';
      } else {
        modalFooter.innerHTML += '<button type="button" class="btn btn-outline-danger favorite-btn">Favoritar</button>';
      }
    })
  
    const removeCat = catsItem.querySelector('.favorito');
    
    removeCat.addEventListener("click", (e) => {
      
      const key = e.target.closest('[data-key]').getAttribute('data-key');
      const index = parseInt(key, 10);
          
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      e.target.closest('.col-md-4').remove();
    
      document.querySelector('#favCont').innerHTML = `Favorito (${favorites.length})`;
    });
    
  });

const myProductModal = new bootstrap.Modal(document.getElementById('productModal'));

const detailButton = document.querySelectorAll(".detail-button");
detailButton.forEach(button => {
  button.addEventListener("click", () => {
    myProductModal.show();
  });
});


