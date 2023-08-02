<template>
  <div id='top'>
    <div class='card'>
      <h2 class='card-title'>
        講師登録
      </h2>
      <div class='card-body'>
        <div class='field'>
          <label>
            講師名
          </label>
          <input type='text' v-model="name">
        </div>
        <div class='field'>
          <label>
            担当ブース
          </label>
          <ul>
            <li><input type='radio' name='booth' value='説明' v-model='booth'>　説明ブース</li>
            <li><input type='radio' name='booth' value='3D CAD' v-model='booth'>　3D CADブース</li>
            <li><input type='radio' name='booth' value='3D プリンター' v-model='booth'>　3D プリンターブース</li>
          </ul>
        </div>
        <div class='action-field'>
          <div :class='isValidField ? "btn" : "btn disabled"' @click='login'>
            登録
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const name = ref('')
const booth = ref('exp')

const isValidField = computed(() => (!!name.value && !!booth.value))

const login = () => {
  if (isValidField.value) {
    window.localStorage.name = name.value
    window.localStorage.booth = name.value
    router.push('/')
  }
}
</script>


<style scoped>
#top {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  display: inline-block;
  padding: 2em 2.5em;
  border-radius: 2em;
  border: solid 1px #ddd;
  width: 250px;
  box-shadow: 0px 0px 7px 0px #777777;
}

.card-title {
  margin-bottom: 5px;
  padding-left: 15px;
  border-left: solid 5px #392061;
  color: #392061;
}
.card-body {
  padding: 0.5em 1em;
}
.card-body label {
  display: block;
}

.field {
  margin: 15px 0;
}

.field input {
  margin-left: 1em;
}

.field label {
  font-size: 1.25em;
  margin-bottom: 5px;
}
.field label:before {
  content: '-';
  color: #392061;
  font-size: 1.25em;
  margin-bottom: 5px;
}

.btn {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  padding: 0.3em 3em;
  border-radius: 20px;
  border: solid 4px #392061;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color ease 0.25s;
}

.btn:after {
  position: absolute;
  content: '';
  display: inline-block;
  background-color: #392061;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  transition: left ease 0.25s;
  z-index: -1;
}

.btn:hover {
  color: #FFFFFF;
  transition: color ease 0.3s;
}
.btn:hover:after {
  left: 0;
  transition: left ease 0.3s;
}

.action-field {
  text-align: center;
}

.disabled {
  background-color: #a0a0a0;
}
.disabled:hover {
  background-color: #a0a0a0;
  color: #000000;
}
</style>