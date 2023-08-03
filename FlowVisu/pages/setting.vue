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
          <router-link to='/' class='btn'>
            戻る
          </router-link>
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
const booth = ref('')

const isValidField = computed(() => (!!name.value && !!booth.value))

onMounted(() => {
  name.value = window.localStorage.getItem('name') ?? ''
  booth.value = window.localStorage.getItem('booth') ?? ''
})

const login = () => {
  if (isValidField.value) {
    window.localStorage.name = name.value
    window.localStorage.booth = booth.value
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
  border-left: solid 5px #00BD9D;
  color: #00BD9D;
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
  color: #00BD9D;
  font-size: 1.25em;
  margin-bottom: 5px;
}

.action-field {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.btn {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  padding: 0.3em 1em;
  margin-top: 10px;
  border-radius: 1em;
  border: solid 2px #8BD7D2;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color ease 0.2s, color ease 0.2s;
}

.btn:hover {
  color: #FFFFFF;
  background-color: #8BD7D2;
  transition: background-color ease 0.2s, color ease 0.2s;
}

.action-field {
  text-align: center;
}

.disabled {
  opacity: 0.5;
}
.disabled:hover {
  color: #000;
  background-color: #fff;
}
</style>