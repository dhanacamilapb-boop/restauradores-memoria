/* ==========================================================================
   Restauradores de la Memoria — tema día/noche y menú responsive
   Este archivo solo gestiona la interfaz que rodea al museo 3D.
   No interactúa con A-Frame ni con la lógica de Supabase.
   ========================================================================== */

(function () {
  'use strict';

  var CLAVE = 'tema-restauradores';
  var raiz = document.documentElement;
  var sistema = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  /* ---------- Tema ---------- */

  function leerGuardado() {
    try {
      var valor = localStorage.getItem(CLAVE);
      return valor === 'dark' || valor === 'light' ? valor : null;
    } catch (e) {
      return null; // localStorage no disponible: el tema solo dura la visita
    }
  }

  function guardar(tema) {
    try { localStorage.setItem(CLAVE, tema); } catch (e) { /* sin almacenamiento */ }
  }

  function aplicar(tema) {
    raiz.setAttribute('data-theme', tema);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'dark' ? '#191D1B' : '#F3F1E9');

    var interruptor = document.getElementById('btn-tema');
    if (interruptor) interruptor.setAttribute('aria-checked', tema === 'dark' ? 'true' : 'false');
  }

  // Se ejecuta en el <head>, antes del primer pintado, para evitar el parpadeo
  aplicar(leerGuardado() || (sistema && sistema.matches ? 'dark' : 'light'));

  /* ---------- Interacciones (cuando el DOM está listo) ---------- */

  document.addEventListener('DOMContentLoaded', function () {

    // Selector de tema
    var interruptor = document.getElementById('btn-tema');
    aplicar(raiz.getAttribute('data-theme')); // sincroniza aria-checked

    if (interruptor) {
      interruptor.addEventListener('click', function () {
        var siguiente = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        aplicar(siguiente);
        guardar(siguiente);
      });
    }

    // Si la persona no eligió tema, seguir los cambios del sistema
    if (sistema) {
      var alCambiarSistema = function (e) {
        if (!leerGuardado()) aplicar(e.matches ? 'dark' : 'light');
      };
      if (sistema.addEventListener) sistema.addEventListener('change', alCambiarSistema);
      else if (sistema.addListener) sistema.addListener(alCambiarSistema);
    }

    // Menú desplegable en pantallas pequeñas
    var cabecera = document.querySelector('header');
    var boton = document.getElementById('btn-menu');
    var menu = document.getElementById('menu-principal');
    if (!cabecera || !boton || !menu) return;

    function estaAbierto() { return cabecera.classList.contains('menu-abierto'); }

    function alternarMenu(abrir) {
      cabecera.classList.toggle('menu-abierto', abrir);
      boton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    }

    boton.addEventListener('click', function () { alternarMenu(!estaAbierto()); });

    // Al elegir una opción, el menú se cierra y el enlace sigue su destino
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) alternarMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && estaAbierto()) {
        alternarMenu(false);
        boton.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (estaAbierto() && !cabecera.contains(e.target)) alternarMenu(false);
    });

    // Si la ventana se ensancha hasta el modo escritorio, se restablece
    if (window.matchMedia) {
      var escritorio = window.matchMedia('(min-width: 1240px)');
      var alCambiarAncho = function (e) { if (e.matches) alternarMenu(false); };
      if (escritorio.addEventListener) escritorio.addEventListener('change', alCambiarAncho);
      else if (escritorio.addListener) escritorio.addListener(alCambiarAncho);
    }
  });
})();
