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
    <router-link to='/' class='btn'>
      戻る
    </router-link>
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

const onDecode = async (data) => {
  try {
    const step = window.localStorage.getItem('name')
    const res = await fetch('http://flow-visu.suwageeks.org:3000/' + '/tag', {
      method: "post",
      body: {
        tagId: data.toString(),
        stepNo: step === "説明" ? 1 : (step === "3D CAD" ? 2 : 3),
        boothId: 'none',
        operator: window.localStorage.getItem('name'),
        content: 'none'
      }
    })
    const text = await res.text()
    const resB = await JSON.parse(text)
    alert(resB)
  } catch(e) {
    alert(e)
  }
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
  border-left: solid 5px #00BD9D;
  color: #00BD9D;
}
.card-body {
  padding-left: 1em;
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

.btn {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  padding: 0.3em 3em;
  margin-top: 25px;
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
</style>