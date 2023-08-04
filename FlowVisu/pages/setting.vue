<template>
  <div id='top'>
    <div class='card'>
      <h2 class='card-title'>
        講師登録
      </h2>
      <div class='card-body'>
        <div class='field'>
          <label class='label-title'>
            講師名
          </label>
          <div class='input-text'>
            <input type='text' v-model="name">
          </div>
        </div>
        <div class='field'>
          <label class='label-title'>
            担当ブース
          </label>
          <ul>
            <li>
              <label name='exp' class='radio'>
                <input type='radio' name='exp' value='説明' v-model='booth'>
                <span>説明ブース</span>
              </label>
            </li>
            <li>
              <label name='cad' class='radio'>
                <input type='radio' name='cad' value='3D CAD' v-model='booth'>
                <span>3D CADブース</span>
              </label>
            </li>
            <li>
              <label name='print' class='radio'>
                <input type='radio' name='print' value='3D Print' v-model='booth'>
                <span>3D プリンターブース</span>
              </label>
            </li>
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
.card-body .label-title {
  display: block;
}

.field {
  margin: 15px 0;
}


.field .label-title {
  font-size: 1.25em;
  margin-bottom: 5px;
}
.field .label-title:before {
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

.input-text {
  border: solid 2px #8BD7D2;
  height: 2em;
  border-radius: 2em;
  display: inline-block;
  padding: 0 1em;
  margin-left: 1em;
  width: 150px;
}
.input-text input {
  height: 100%;
  width: 100%;
  border-radius: 2em;
  border: none;
  font-size: 1em;
}
.input-text input:focus {
  outline: none;
}

ul {
  margin-left: 1em;
}
input[type=radio] {
  display: none;
}

.radio {
  cursor: pointer;
}
.radio span {
  display: flex;
  align-items: center;
}
.radio span:before {
  display: inline-block;
  content: '';
  width: calc(1em - 6px);
  height: calc(1em - 6px);
  border: solid 3px #8BD7D2;
  margin-right: 0.5em;
}

input[type=radio]:checked + span:before {
  background-color: #00BD9D;
}
</style>