const Iniciar = document.getElementById("btn-iniciar");
const pantallainicio = document.getElementById("pantalla-inicio");
const pantallajuego1 = document.getElementById("pantalla-juego-1");
const pantallajuego2 = document.getElementById("pantalla-juego-2");

if (Iniciar) { // Check if element exists before adding event listener
  Iniciar.addEventListener("click", () => {
    pantallainicio.style.display = "none";
    pantallajuego1.style.display = "block";
  });
} else {
  console.error("Element with ID 'btn-inciar' not found!");
}

document.addEventListener("DOMContentLoaded", function () {
  const piezas = document.querySelectorAll('.pieza');
  const pantallaimg = document.querySelector('.pantallaimg');

  // Función para el evento dragstart en las piezas
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', this.id);
    e.currentTarget.classList.add('hold');
    setTimeout(() => this.classList.add('invisible'), 0);
  }

  // Función para el evento dragend en las piezas
  function dragEnd() {
    this.classList.remove('invisible');
  }

  // Función para el evento touchstart en las piezas
  function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const offsetX = touch.clientX - this.getBoundingClientRect().left;
    const offsetY = touch.clientY - this.getBoundingClientRect().top;
    this.setAttribute('data-offset-x', offsetX);
    this.setAttribute('data-offset-y', offsetY);
  }

  // Función para el evento touchmove en las piezas
  function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const offsetX = parseInt(this.getAttribute('data-offset-x'));
    const offsetY = parseInt(this.getAttribute('data-offset-y'));
    this.style.left = (touch.clientX - offsetX) + 'px';
    this.style.top = (touch.clientY - offsetY) + 'px';
  }

  // Función para el evento touchend en las piezas
  function touchEnd() {
    this.removeAttribute('data-offset-x');
    this.removeAttribute('data-offset-y');
  }

  // Asignar eventos de drag y touch a las piezas
  piezas.forEach(pieza => {
    pieza.addEventListener('dragstart', dragStart);
    pieza.addEventListener('dragend', dragEnd);
    pieza.addEventListener('touchstart', touchStart);
    pieza.addEventListener('touchmove', touchMove);
    pieza.addEventListener('touchend', touchEnd);
  });

  // Función para el evento dragover en la pantalla
  function dragOver(e) {
    e.preventDefault();
  }

  // Función para el evento dragenter en la pantalla
  function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
  }

  // Función para el evento dragleave en la pantalla
  function dragLeave(e) {
    const target = e.target.closest('.pantallaimg');
    if (!target || target !== this) {
      this.classList.remove('hovered');
    }
  }

  function drop(e) {
    e.preventDefault();
    const piezaId = e.dataTransfer.getData('text/plain');
    const pieza = document.getElementById(piezaId);
    const target = e.target.closest('.pantallaimg');
    if (target) {
      // Si la pieza es la correcta, clonarla y colocar el clon en el área de drop
      if (pieza.classList.contains('correcto')) {
        const clone = pieza.cloneNode(true);
        target.appendChild(clone);
        clone.style.position = 'absolute';
        clone.style.top = (e.clientY - target.offsetTop - clone.offsetHeight / 2) + 'px';
        clone.style.left = (e.clientX - target.offsetLeft - clone.offsetWidth / 2) + 'px';
      } else {
        // Mover todas las piezas no correctas al área de drop
        target.appendChild(pieza);
        pieza.style.position = 'absolute';
        pieza.style.top = (e.clientY - target.offsetTop - pieza.offsetHeight / 2) + 'px';
        pieza.style.left = (e.clientX - target.offsetLeft - pieza.offsetWidth / 2) + 'px';
      }
    }
    this.classList.remove('hovered');
  }

  // Asignar eventos de drag and drop a la pantalla
  pantallaimg.addEventListener('dragover', dragOver);
  pantallaimg.addEventListener('dragenter', dragEnter);
  pantallaimg.addEventListener('dragleave', dragLeave);
  pantallaimg.addEventListener('drop', drop);
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el botón siguiente
  const siguienteBtn = document.querySelector('.siguienteBtn');

  // Agregar event listener al botón siguiente
  siguienteBtn.addEventListener('click', function() {
    // Ocultar la pantalla actual
    pantallajuego1.style.display = 'none';
    // Mostrar la siguiente pantalla
    pantallajuego2.style.display = 'block';
  });
});



