<template>
  <div id='top'>
    <section class='statistics'>
      <div>
        <h3>
          ブース内人数
        </h3>
        <p>
          {{ boothPeople }} 人
        </p>
      </div>
      <div>
        <h3>
          体験者総数
        </h3>
        <p>
          {{ statusList.length }} 人
        </p>
      </div>
      <div>
        <h3>
          最終更新時間
        </h3>
        <p>
          {{ convertTime(lastUpdate) }}
        </p>
      </div>
    </section>
    <section class='dashboard'>
      <div class='status'>
        <div class='section-head'>
          <h2 class='subtitle'>
            説明ブース
          </h2>
        </div>
        <div class='section-body'>
          <ul v-for="status in stepFilter(1)" :key='status.index'>
            <li>
              <div class="card">
                <ul>
                  <li>id: {{ status.tagId }}</li>
                  <li>担当者: {{ status.operator }}</li>
                  <li>開始時間: {{ convertTime(status.created_at) }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='status'>
        <div class='section-head'>
          <h2 class='subtitle'>
            3DCADブース
          </h2>
        </div>
        <div class='section-body'>
          <ul v-for="status in stepFilter(2)" :key='status.index'>
            <li>
              <div class="card">
                <ul>
                  <li>id: {{ status.tagId }}</li>
                  <li>担当者: {{ status.operator }}</li>
                  <li>開始時間: {{ convertTime(status.created_at) }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='status'>
        <div class='section-head'>
          <h2 class='subtitle'>
            3DPrintブース
          </h2>
        </div>
        <div class='section-body'>
          <ul v-for="status in stepFilter(3)" :key='status.index'>
            <li>
              <div class="card">
                <ul>
                  <li>id: {{ status.tagId }}</li>
                  <li>担当者: {{ status.operator }}</li>
                  <li>開始時間: {{ convertTime(status.created_at) }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const statusList = ref<Array<{
  "id": Number
  "boothId": String
  "status": String,
  "tagId": String
  "startTime": String,
  "operator": String
  "created_at": String
  "updated_at": String
  "stepNo": Number
  "content": String
}>>([])
const lastUpdate = ref(0)

onMounted(async () => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
    return
  }
  await update()
  setInterval(async() => {
    await update()
  }, 30000)
})

const update = async () => {
  try {
    const res = await fetch('https://api.flow-visu.suwageeks.org/status', {
      method: "get"
    })
    statusList.value = JSON.parse(await res.text()).data
    lastUpdate.value = new Date()
  } catch(e) {
    alert('APIの情報が取得できません')
    router.push('/')
  }
}

const stepFilter = (stepNo: Number) => {
  if (statusList.value) {
    return statusList.value.filter((status) => {
      return status.stepNo === stepNo
    })
  } else {
    return []
  }
}

const boothPeople = computed(() => {
  if (statusList.value) {
    return statusList.value.filter((status) => {
      return status.stepNo < 4
    }).length
  } else {
    return 0
  }
})

const convertTime = (d) => {
  return (new Date(d)).toLocaleString('jp-ja') 
}
</script>

<style scoped>
#top {
  height: 100%;
}

.statistics {
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.statistics p {
  text-align: center;
}

.dashboard {
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: solid 3px #00BD9D;
}

.status {
  width: 30%;
  padding-top: 15px;
}
.section-head {
  text-align: center;
}
.subtitle {
  display: inline-block;
  border-bottom: solid 5px #7a7a7a;
  padding: 0 20px;
}
.section-body {
  padding-top: 20px;
  overflow-y: scroll;
  height: calc(100% - 20px - 41px);
}

.card {
  width: 80%;
  margin: 20px auto;
  padding: 15px 25px;
  border-radius: 25px;
  border: solid 1px #392061;
}

@media screen and (max-width: 870px) {
  .statistics,
  .dashboard {
    flex-direction: column;
    justify-content: normal;
    overflow-y: scroll;
    height: auto;
  }

  .statistics div { 
    margin: 10px 0;
  }

  .status {
    width: 90%;
    margin: 0 auto;
  }
}
</style>