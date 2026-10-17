<template>
  <section class="stage">
    <h1 class="stage__flat">La teva col·lecció de videojocs</h1>

    <svg class="stage__arc" viewBox="0 0 1566 900" aria-hidden="true">
      <defs>
        <path id="arc-titol" d="M 150 420 A 898 898 0 0 1 1416 420" />
      </defs>
      <text class="stage__arc-text">
        <textPath href="#arc-titol" startOffset="50%" text-anchor="middle">
          LA TEVA COL·LECCIÓ DE VIDEOJOCS
        </textPath>
      </text>
    </svg>

    <RouterLink to="/games" class="btn-black stage__btn">Veure catàleg</RouterLink>

    <img class="stage__hero" src="/img/guerrer.png" alt="" />
  </section>
</template>
