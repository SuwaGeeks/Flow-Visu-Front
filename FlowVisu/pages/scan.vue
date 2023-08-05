<template>
  <div id='top'>
    <div class='message' v-if='message.isShow' @click='message.isShow = false'>
      <div class='message-card'>
        <div>
          <h2 :class="message.isError ? 'message-card-title error' : 'message-card-title'">
            {{ message.isError ? 'Error' : 'Success'}}
          </h2>
          <p>
            {{ message.text }}
          </p>
        </div>
      </div>
    </div>
    <div class='card'>
      <div>
        <h2 class='card-title'>
          講師情報
        </h2>
        <div class='card-body'>
          <div class='field'>
            <p>
              講師名: <span>{{ name }}</span>
            </p>
            <p>
              担当ブース: <span>{{ booth }}ブース</span>
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
              userId: <span>{{ uid }}</span>
            </p>
            <p>
              開始時間: <span>{{ start }}</span>
            </p>
            <p>
              終了予定時間: <span>{{ end }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class='card qr'>
      <qr-stream @decode='onDecode'>
      </qr-stream>
    </div>
    <div>
      <router-link to='/' class='btn'>
        戻る
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QrStream } from 'vue3-qr-reader'
const name = ref('')
const booth = ref('')
const uid = ref('')
const start = ref('')
const end = ref('')

const message = reactive<{
  isShow: Boolean
  isError: Boolean
  text: String
}>({
  isShow: false,
  isError: false,
  text: ''
})

const router = useRouter()

onMounted(() => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
  }
  name.value = window.localStorage.getItem('name')
  booth.value = window.localStorage.getItem('booth')
})

const onDecode = async (data) => {
  try {
    if (data.toString() === "") { return }
    const res = await fetch('https://api.flow-visu.suwageeks.org/tag', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tagId: data.toString(),
        stepNo: booth.value === "説明" ? 1 : (booth.value === "3D CAD" ? 2 : 3),
        boothId: 'none',
        operator: name.value,
        content: 'none'
      })
    })
    const resJson = JSON.parse(await res.text())
    if (resJson.message === 'OK') {
      uid.value = data.toString()
      start.value = (new Date()).toLocaleString('jp-ja')
      end.value = '未定'
      message.isError = false
      message.text = 'ブースへ入場しました'
    } else {
      if (res.status === 400) {
        throw new Error('ブースへ入場済みです')
      } else {
        throw new Error('API-ERROR')
      }
    }
  } catch(e) {
    message.isError = true
    message.text = e.message
  }

  message.isShow = true
  setTimeout(function() {
    message.isShow = false
  }, 3000)
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
  height: 2em;
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

.message {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;

  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #77777770;
  z-index: 999999;
}
.message-card {
  display: inline-block;
  padding: 2em 2.5em;
  border-radius: 2em;
  border: solid 1px #ddd;
  width: 300px;
  height: 300px;
  background-color: #fff;
}
.message-card-title {
  margin-bottom: 20px;
  padding-left: 15px;
  border-left: solid 5px #00BD9D;
  color: #00BD9D;
}
.error {
  border-left: solid 5px #bd0029;
  color: #bd0029;
}
</style>