<template>
  <div id='top'>
    <div class='card'>
      <div>
        <h2 class='card-title'>
          講師情報
        </h2>
        <div class='card-body'>
          <div class='field'>
            <p>
              講師名: <span>佐伯 空都</span>
            </p>
            <p>
              担当ブース: <span>説明ブース</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 class='card-title'>
          担当情報
        </h2>
        <div class='card-body'>
          <div class='field'>
            <p>
              経過時間: <span>xxx</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class='card qr'>
      <qr-stream @decode='onDecode'>
      </qr-stream>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QrStream } from 'vue3-qr-reader'

const router = useRouter()

onMounted(() => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
  }
})

const onDecode = (data) => {
  console.log(data)
}
</script>


<style scoped>
#top {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: solid 4px #AA6373;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color ease 0.3s;
}

.btn:after {
  position: absolute;
  content: '';
  display: inline-block;
  background-color: #AA6373;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  transition: left ease 0.3s;
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

.card {
  margin-top: 30px;
}
</style>