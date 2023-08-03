<template>
  <div id='top'>
    <div class='info'>
      <h3>
        設定情報
      </h3>
      <ul>
        <li>講師名: {{ name }}</li>
        <li>担当ブース: {{ booth }}</li>
      </ul>
      <div class='info-action'>
        <router-link to='/setting' class='info-btn'>設定</router-link>
      </div>
    </div>
    <router-link to='/scan' class='btn'>
      <h2 class='card-title'>
        ユーザースキャン
      </h2>
    </router-link>
    <router-link to='/exit-scan' class='btn'>
      <h2 class='card-title'>
        出口スキャン
      </h2>
    </router-link>
    <router-link to='/dashbord' class='btn'>
      <h2 class='card-title'>
        ダッシュボード
      </h2>
    </router-link>
    <div>
      <p>
        API Server: {{ apiStatus }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const apiStatus = ref('Loading...')
const name = ref('')
const booth = ref('')

onMounted(async () => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
    return
  }

  name.value = window.localStorage.getItem('name')
  booth.value = window.localStorage.getItem('booth')

  try {
    const res = await fetch('http://flow-visu.suwageeks.org:3000' + '/ping', {
      method: "get"
    })

    if (res.ok) {
      apiStatus.value = 'Success'
    } else {
      apiStatus.value = 'Error'
    }
  } catch(e) {
    apiStatus.value = 'Error'
  }
})
</script>

<style scoped>
#top {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.btn {
  width: 300px;
  margin: 20px auto;
  padding: 15px 25px;
  border-radius: 25px;
  border: solid 3px #00BD9D;
  cursor: pointer;
  transition: all ease 0.3s;
}

.btn:hover {
  color: #ffffff;
  background-color: #00BD9D;
  transition: all ease 0.3s;
}

.info {
  width: 300px;
  margin: 20px auto;
  padding: 15px 25px;
  border-radius: 25px;
  border: solid 3px #00BD9D;
  margin-bottom: 70px;
}
.info h3 {
  display: inline-block;
  padding: 0 10px;
  margin-bottom: 20px;
  border-bottom: solid 4px #00BD9D;
}
.info ul {
  margin-left: 15px;
}
.info-action {
  margin: 10px 0;
  text-align: right;
}
.info-btn {
  display: inline-block;
  text-align: center;
  padding: 0.2em 1em;
  border-radius: 0.5em;
  font-size: 1.15em;
  font-weight: 600;
  color: #000000;
  border: solid 3px #8BD7D2;
  transition: background-color ease 200ms, color ease 200ms;
}
.info-btn:hover {
  color: #fff;
  background-color: #8BD7D2;
  transition: background-color ease 200ms, color ease 200ms;
}
</style>
