<template>
  <div>
    <header>
      <h1>
        Flow-Visu
      </h1>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <span>&copy; flow-visu.suwageeks.org</span>
    </footer>
  </div>
</template>

<style>
*,
html,
head,
body {
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}
</style>

<style scoped>
header {
  height: 50px;
  text-align: center;
  box-shadow: 0px 7px 10px -5px #777777;
}

main {
  height: calc(100vh - 80px);
}

footer {
  height: 30px;
  border-top: solid 1px #777777;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>