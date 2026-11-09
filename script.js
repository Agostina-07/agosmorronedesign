
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     CIRCUITO INTERACTIVO
  ===================================== */

  const pista = document.querySelector(".pista");
  const botones = document.querySelectorAll(".curva");
  const tarjeta = document.querySelector("#info-curva");

  const numero = document.querySelector("#info-numero");
  const etiqueta = document.querySelector("#info-etiqueta");
  const titulo = document.querySelector("#info-titulo");
  const texto = document.querySelector("#info-texto");
  const codigo = document.querySelector("#info-codigo");

  const curvas = [
    {
      numero: "CURVA 01",
      etiqueta: "PRESENTACIÓN DEL PILOTO",
      titulo: "¿Quién soy?",
      texto: "Soy Agostina, estudiante de Diseño Gráfico en UADE. Curiosa, organizada y detallista, disfruto explorar nuevas formas de crear y comunicar ideas. Me gusta combinar lo analógico y lo digital para encontrar mi propia manera de diseñar.",
      codigo: "AM / PROFILE"
    },
    {
      numero: "CURVA 02",
      etiqueta: "FORMACIÓN",
      titulo: "Mi recorrido",
      texto: "2022 – Actualidad: Licenciatura en Diseño Gráfico, UADE. 2021: Curso de Marketing Digital en Capacitarte. 2020: Bachillerato con orientación en Economía y Gestión de las Organizaciones.",
      codigo: "AM / EDUCATION"
    },
    {
      numero: "CURVA 03",
      etiqueta: "EQUIPAMIENTO DE FÁBRICA",
      titulo: "Mis herramientas",
      texto: "Trabajo con Illustrator, Photoshop, InDesign, Fresco y Figma. Me interesan la ilustración, la composición, la tipografía, la edición de imagen y la creación de contenido para redes sociales.",
      codigo: "AM / TOOLKIT"
    },
    {
      numero: "CURVA 04",
      etiqueta: "EXPERIENCIA EN PISTA",
      titulo: "Mi recorrido profesional",
      texto: "Trabajé en identidad visual, branding y gestión de redes para Lei Kawsay y Tina Cosmetics. También desarrollé contenido y piezas gráficas para Librería Oeste y Librería Atalaya.",
      codigo: "AM / EXPERIENCE"
    },
    {
      numero: "CURVA 05",
      etiqueta: "MÉTODO DE CONDUCCIÓN",
      titulo: "Cómo trabajo",
      texto: "Investigo, organizo, experimento y ajusto. Me gusta cuidar los detalles y trabajar con método, pero dejando espacio para probar nuevos caminos. Cada proyecto necesita encontrar su propia trazada.",
      codigo: "AM / SETUP"
    }
  ];

  if (pista && tarjeta && botones.length > 0) {


function posicionarTarjeta(boton, indice) {

  const esMovil = window.matchMedia("(max-width: 700px)").matches;

  const pistaRect = pista.getBoundingClientRect();
  const botonRect = boton.getBoundingClientRect();

  const centroX =
    botonRect.left - pistaRect.left + botonRect.width / 2;

  const centroY =
    botonRect.top - pistaRect.top + botonRect.height / 2;

  const anchoPista = pista.clientWidth;
  const altoPista = pista.clientHeight;

  const anchoTarjeta = tarjeta.offsetWidth;
  const altoTarjeta = tarjeta.offsetHeight;

  let izquierda;
  let arriba;

  if (esMovil) {

  // En mobile la tarjeta vuelve al flujo normal
  // y se centra mediante CSS.
  tarjeta.style.left = "";
  tarjeta.style.top = "";

  return;

} else {

    // POSICIONAMIENTO ORIGINAL DE ESCRITORIO
    const lados = [
      "derecha",
      "izquierda",
      "izquierda",
      "derecha",
      "izquierda"
    ];

    const lado = lados[indice] || "derecha";

    if (lado === "derecha") {
      izquierda = centroX + 32;

      if (izquierda + anchoTarjeta > anchoPista - 12) {
        izquierda = centroX - anchoTarjeta - 32;
      }

    } else {
      izquierda = centroX - anchoTarjeta - 32;

      if (izquierda < 12) {
        izquierda = centroX + 32;
      }
    }

    izquierda = Math.max(
      12,
      Math.min(izquierda, anchoPista - anchoTarjeta - 12)
    );

    arriba = centroY - altoTarjeta / 2;

    arriba = Math.max(
      12,
      Math.min(arriba, altoPista - altoTarjeta - 12)
    );
  }

  tarjeta.style.left = `${izquierda}px`;
  tarjeta.style.top = `${arriba}px`;
}

    function seleccionarCurva(boton) {

      const indice = Number(boton.dataset.curva);
      const datos = curvas[indice];

      if (!datos) return;

      numero.textContent = datos.numero;
      etiqueta.textContent = datos.etiqueta;
      titulo.textContent = datos.titulo;
      texto.textContent = datos.texto;
      codigo.textContent = datos.codigo;

      botones.forEach((otroBoton) => {

        const seleccionado = otroBoton === boton;

        otroBoton.classList.toggle("activa", seleccionado);
        otroBoton.setAttribute(
          "aria-pressed",
          String(seleccionado)
        );

      });

      requestAnimationFrame(() => {
        posicionarTarjeta(boton, indice);
      });
    }

    botones.forEach((boton) => {
      boton.addEventListener("click", () => {
        seleccionarCurva(boton);
      });
    });

    window.addEventListener("resize", () => {

      const botonActivo = document.querySelector(".curva.activa");

      if (botonActivo) {
        requestAnimationFrame(() => {
          posicionarTarjeta(
            botonActivo,
            Number(botonActivo.dataset.curva)
          );
        });
      }
    });

    const primeraCurva =
      document.querySelector('.curva[data-curva="0"]') || botones[0];

    seleccionarCurva(primeraCurva);

  } else {
    console.warn;
  }


  /* =====================================
     MENÚ HAMBURGUESA
  ===================================== */

  const btnMenu = document.querySelector("#btnMenu");
  const mainNav = document.querySelector("#mainNav");
  const scrim = document.querySelector("#scrim");

  if (btnMenu && mainNav) {

    function cerrarMenu() {

      mainNav.classList.remove("is-open");

      btnMenu.setAttribute("aria-expanded", "false");
      btnMenu.setAttribute("aria-label", "Abrir menú");

      if (scrim) scrim.hidden = true;
    }

    function abrirMenu() {

      mainNav.classList.add("is-open");

      btnMenu.setAttribute("aria-expanded", "true");
      btnMenu.setAttribute("aria-label", "Cerrar menú");

      if (scrim) scrim.hidden = false;
    }

    btnMenu.addEventListener("click", () => {

      const menuAbierto = mainNav.classList.contains("is-open");

      if (menuAbierto) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    if (scrim) {
      scrim.addEventListener("click", cerrarMenu);
    }

    mainNav.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", cerrarMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) cerrarMenu();
    });
  }


  /* =====================================
     SCROLL SUAVE
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach((enlace) => {

    enlace.addEventListener("click", (evento) => {

      const href = enlace.getAttribute("href");
      const destino = document.querySelector(href);

      if (!destino) return;

      evento.preventDefault();

      destino.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });

});

/* =========================================
   LICENCIA DE CONTACTO — GIRAR TARJETA
========================================= */

const licenciaFlip = document.querySelector('.licencia-flip');
const licenciaGirar = document.querySelector('.licencia-girar');

if (licenciaFlip && licenciaGirar) {
  licenciaGirar.addEventListener('click', () => {
    const estaGirado = licenciaFlip.classList.toggle('girada');

    licenciaGirar.setAttribute('aria-pressed', estaGirado);

    licenciaGirar.setAttribute(
      'aria-label',
      estaGirado
        ? 'Volver al frente de la licencia'
        : 'Dar vuelta la licencia para ver los datos de contacto'
    );

    licenciaGirar.querySelector('.licencia-girar-icono').textContent =
      estaGirado ? '↶' : '↻';
  });
}
