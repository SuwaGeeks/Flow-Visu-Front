<template>
  <div>
    <header>
      <h1>
        Flow-Visu
      </h1>
      <h6>
        Powered By <a href='https://suwageeks.org'>SuwaGeeks</a>
      </h6>
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
  font-family: 'Heebo';
}

ul,
li {
  list-style: none;
}

a {
  color: #000000;
  text-decoration: none;
}
</style>

<style scoped>
header {
  height: 70px;
  text-align: center;
  border-bottom: solid 5px #00BD9D;
  color: #00BD9D;
  z-index: 99;
}
header a {
  color: #49C6E5;
  border-bottom: solid 1px #49C6E5;
}

main {
  height: calc(100vh - 100px);
  background-color: #fffbfa;
  z-index: 9;
  overflow-y: scroll;
}

footer {
  height: 30px;
  border-top: solid 1px #777777;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
</style>