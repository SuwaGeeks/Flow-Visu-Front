<template>
  <div id='top'>
    <router-link to='/scan' class='btn'>
      <h2 class='card-title'>
        ユーザースキャン
      </h2>
    </router-link>
    <router-link to='/dashbord' class='btn'>
      <h2 class='card-title'>
        ダッシュボード
      </h2>
    </router-link>
    <router-link to='/setting' class='btn'>
      <h2 class='card-title'>
        設定
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

onMounted(async () => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
    return
  }

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
  justify-content: center;
  align-items: center;
}

.btn {
  width: 300px;
  margin: 20px auto;
  padding: 15px 25px;
  border-radius: 25px;
  border: solid 3px #392061;
  cursor: pointer;
  transition: all ease 0.3s;
}

.btn:hover {
  color: #ffffff;
  background-color: #392061;
  transition: all ease 0.3s;
}
</style>