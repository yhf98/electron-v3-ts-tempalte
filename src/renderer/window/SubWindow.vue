<script setup lang="ts">
import { onMounted } from "vue";
import { dialogReady } from "../common/Dialog";
import addEvent from "../utils/addEvent";

const closeAndSendData = () => {
  window.opener.postMessage(JSON.stringify({ msg: "子窗口数据", code: 500 }));
  window.close();
}

onMounted(() => {
  dialogReady();

  addEvent(window, "message", (e) => {
    console.info(e.data)
  })
});
</script>

<template>
  <div class="editContent">
    <BarTop title="子窗口" />
    <div>
      子窗口
    </div>
    <button @click="closeAndSendData">关闭/发送数据给父窗口</button>
  </div>
</template>
