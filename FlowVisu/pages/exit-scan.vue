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
          出口
        </h2>
        <qr-stream @decode='onDecode'>
        </qr-stream>
      </div>
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
const router = useRouter()

const message = reactive<{
  isShow: Boolean
  isError: Boolean
  text: String
}>({
  isShow: false,
  isError: false,
  text: ''
})

onMounted(() => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
  }
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
        stepNo: 4,
        boothId: 'none',
        operator: 'System',
        content: 'none'
      })
    })
    const resJson = JSON.parse(await res.text())
    if (resJson.message === 'OK') {
      message.isError = false
      message.text = 'ありがとうございました!'
    } else {
      if (res.status === 400) {
        throw new Error('既に退室済みです')
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
  justify-content: center;
}

.card {
  display: inline-block;
  padding: 2em 2.5em;
  border-radius: 2em;
  border: solid 1px #ddd;
  width: 300px;
  box-shadow: 0px 0px 7px 0px #777777;
}

.card-title {
  margin-bottom: 20px;
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