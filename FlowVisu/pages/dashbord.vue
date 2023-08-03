<template>
  <div id='top'>
    <section>
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
                <li>開始時間: {{ status.startTime }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section>
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
                <li>開始時間: {{ status.startTime }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section>
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
                <li>開始時間: {{ status.startTime }}</li>
              </ul>
            </div>
          </li>
        </ul>
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

onMounted(async () => {
  if (!window.localStorage.getItem('name')) {
    router.push('/setting')
    return
  }

  try {
    const res = await fetch('https://api.flow-visu.suwageeks.org' + '/status', {
      method: "get"
    })
    statusList.value = JSON.parse(await res.text()).data
  } catch(e) {
    alert('APIの情報が取得できません')
    router.push('/')
  }
})

const stepFilter = (stepNo: Number) => {
  console.log(statusList.value)
  if (statusList.value) {
    return statusList.value.filter((status) => {
      return status.stepNo === stepNo
    })
  } else {
    return []
  }
}
</script>

<style scoped>
#top {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

section {
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
  #top {
    flex-direction: column;
    justify-content: normal;
    overflow-y: scroll;
  }
  section {
    width: 90%;
    margin: 0 auto;
  }
}
</style>