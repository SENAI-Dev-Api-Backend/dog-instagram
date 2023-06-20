async function getCats() {
    try {
    const req = await fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    }
    });
    if (!req.ok) {
    throw new Error('Failed to fetch data');
    }
    const json = await req.json();
    
        return json;
    } catch (err) {
        console.error(err);
        // Handle error here
        return [];
    }
    }
    
    const container = document.querySelector('.container');
    let row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
    let col;
    let count = 0;
    
    getCats().then((catsJson) => {
    catsJson.users.forEach((item, index) =>{

        let catsItem = document.createElement('div');
        catsItem.setAttribute('data-key', item.id);
        catsItem.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" class="card-img-top" alt="${item.name}" />
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-sm btn-outline-secondary detail-button">Ver detalhes</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary edit-button ml-5">Editar</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary delete-button ml-2">Remover</button>
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
    
        catsItem.querySelector('.detail-button').addEventListener('click', (e) => {
            let key = e.target.closest('[data-key]').getAttribute('data-key');
            idOfUser = key
    
            modal.querySelector('.img-fluid').src = 'https://cdn-icons-png.flaticon.com/512/21/21104.png';
            modal.querySelector('.col-md-6 h2').innerHTML = catsJson.users[key].name;
            modal.querySelector('#idade').innerHTML = catsJson.users[key].age;
            modal.querySelector('#cpf').innerHTML = catsJson.users[key].cpf;
            modal.querySelector('#telefone').innerHTML = catsJson.users[key].phone_number;
            modal.querySelector('#data_nascimento').innerHTML = catsJson.users[key].birth_date;
            modal.querySelector('#email').innerHTML = catsJson.users[key].email;
            modal.querySelector('#data_criacao').innerHTML = catsJson.users[key].createdAt;
            modal.querySelector('#data_update').innerHTML = catsJson.users[key].updatedAt;
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
    const editCatModal = new bootstrap.Modal(document.querySelector('#editCatModal'))

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


    // alterando a função para ser async e adicionar o parâmetro addCatButton
    async function addCat(addCatButton){
    
      const name = document.querySelector('#catName').value;
      const age = document.querySelector('#catAge').value;
      const cpf = document.querySelector('#catCpf').value;
      const telefone = document.querySelector('#catPhone').value;
      const data_nascimento = document.querySelector('#catBirth').value;
      const email = document.querySelector('#catEmail').value;
      const password = document.querySelector('#catPassword').value;
    
      // movendo o evento click para fora da função e adicionando o parâmetro event
        // criando um objeto data com as informações da imagem
        let data = {
          name: name,
          age: age,
          cpf: cpf,
          phone_number: telefone,
          birth_date: data_nascimento,
          email: email,
          password: password
        }
    
        try {
          // usando o método fetch para fazer uma requisição POST
          let req = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // corrigindo JSON.parse para JSON.stringify
          })
    
          let json = await req.json()
          console.log(json)
        } catch (err) {
          console.log(err)
        }
    }

    async function editCat(addCatButton){
    
        const name = document.querySelector('#catName').value;
        const age = document.querySelector('#catAge').value;
        const cpf = document.querySelector('#catCpf').value;
        const telefone = document.querySelector('#catPhone').value;
        const data_nascimento = document.querySelector('#catBirth').value;
        const email = document.querySelector('#catEmail').value;
        const password = document.querySelector('#catPassword').value;
      
        // movendo o evento click para fora da função e adicionando o parâmetro event
          // criando um objeto data com as informações da imagem
          let data = {
            name: name,
            age: age,
            cpf: cpf,
            phone_number: telefone,
            birth_date: data_nascimento,
            email: email,
            password: password
          }
      
          try {
            // usando o método fetch para fazer uma requisição POST
            let req = await fetch('http://localhost:3000/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data) // corrigindo JSON.parse para JSON.stringify
            })
      
            let json = await req.json()
            console.log(json)
          } catch (err) {
            console.log(err)
          }
      }
    
    const addCatForm = document.querySelector('#addCatForm')
    
    addCatForm.addEventListener('click', addCat)
    editCatForm.addEventListener('click', () => {
        editCatModal.show()
    })

    const addCatButton = document.querySelector('#addCat');
    
    document.querySelectorAll('.edit-button').forEach((item, index) => {
        item.addEventListener('click', async(e) => {
      
          let key = e.target.closest('[data-key]').getAttribute('data-key');
      
          const nameInput = document.querySelector('#catName');
          const ageInput = document.querySelector('#catAge');
          const cpfInput = document.querySelector('#catCpf');
          const telefoneInput = document.querySelector('#catPhone');
          const dataNascimentoInput = document.querySelector('#catBirth');
          const emailInput = document.querySelector('#catEmail');
          const passwordInput = document.querySelector('#catPassword');
      
          let req = await fetch(`http://localhost:3000/user/${key}`)
          let json = await req.json()
      
          nameInput.value = json.name
          ageInput.value = json.age
          cpfInput.value = json.cpf
          telefoneInput.value = json.phone_number
          dataNascimentoInput.value = json.birth_date
          emailInput.value = json.email
          passwordInput.value = json.password
      
          newCatModal.show();
      
          let editedData = {
            name: nameInput.value,
            age: ageInput.value,
            cpf: cpfInput.value,
            phone_number: telefoneInput.value,
            birth_date: dataNascimentoInput.value || [],
            email: emailInput.value,
            password: passwordInput.value
          }
      
          document.querySelector('.editButtonForm').addEventListener('click', async () => {
      
            let req2 = await fetch(`http://localhost:3000/user/${key}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(editedData)
            })
      
            let json2 = await req2.json()
            console.log(json2)
      
          });
        });      
      })
      
   }).catch((err) => {
   console.log(err);
  });
      
    
    