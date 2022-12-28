const adicionarBtn = document.getElementById('adicionar')
const notas = JSON.parse(localStorage.getItem('notas'))

if (notas) {
  notas.forEach((nota) => adicionarNovaNota(nota))
}

adicionarBtn.addEventListener('click', () => adicionarNovaNota())

function adicionarNovaNota(texto = '') {
  const nota = document.createElement('div')

  nota.classList.add('nota')

  nota.innerHTML = `
        <div class="configuracao">
            <button class="editar">
                <i class="fas fa-edit"></i>
            </button>
            <button class="deletar">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="main ${texto ? '' : 'hidden'}"></div>
        <textarea class="${texto ? 'hidden' : ''}"></textarea>
    `

  const btnEditar = nota.querySelector('.editar')
  const btnDeletar = nota.querySelector('.deletar')
  const main = nota.querySelector('.main')
  const textArea = nota.querySelector('textarea')

  textArea.value = texto
  main.innerHTML = marked(texto)

  btnDeletar.addEventListener('click', () => {
    nota.remove()

    storage()
  })

  btnEditar.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target

    main.innerHTML = marked(value)

    storage()
  })

  document.body.appendChild(nota)
}

function storage() {
  console.log('caiu')
  const notasTexto = document.querySelectorAll('textarea')
  const notas = []

  notasTexto.forEach((nota) => notas.push(nota.value))

  localStorage.setItem('notas', JSON.stringify(notas))
}
