<template>
  <div class="timeline">
    <div class="timeline-grid">
      <section class="timeline-panel timeline-left">
        <div class="timeline-panel-title">输入</div>
        <BFormTextarea class="timeline-textarea" v-model="tl_ctx" placeholder="示例：2026-05-01 - 吃麦当劳" />

        <div class="d-flex gap-2 flex-wrap mt-3">
          <BButton variant="dark" @click="create_timeline()" :disabled="created || timelineList.length > 0">生成时间线</BButton>
          <BButton variant="dark" @click="reset_timeline()">重置</BButton>
        </div>
      </section>

      <section class="timeline-panel timeline-center">
        <div class="timeline-panel-title">可编辑内容</div>

        <div class="timeline-view">
          <div class="timeline-item d-flex gap-3 align-items-start mt-4" v-for="(t, index) in timelineList" :key="index">
            <div class="timeline-rail">
              <div class="timeline-node"></div>
              <div class="timeline-line" v-if="index !== timelineList.length - 1"></div>
            </div>

            <div class="timeline-card flex-grow-1">
              <div class="d-flex flex-row gap-3 align-items-center">
                <input type="date" class="timeline-date fw-bold" v-model="t.date" />
                <input class="timeline-event flex-grow-1" v-model="t.event" />
              </div>

              <div class="d-flex justify-content-end mt-2">
                <BButton size="sm" variant="outline-danger" @click="remove_timeline_item(index)">- 减少</BButton>
              </div>
            </div>
          </div>
        </div>
        <BButton variant="dark" class="add" @click="add_item_into_timeline()">+ 添加</BButton>
        <BButton variant="success" class="timeline-result mt-2" :disabled="timelineList.length === 0" @click="generate_static_timeline()">生成静态时间线</BButton>
      </section>

      <section class="timeline-panel timeline-right">
        <div class="timeline-panel-title">最后的结果</div>

        <div v-if="staticTimeline.length" class="timeline-static">
          <div class="timeline-static-item" v-for="(t, index) in staticTimeline" :key="`${t.date}-${index}`">
            <div class="timeline-static-rail">
              <div class="timeline-static-node"></div>
              <div class="timeline-static-line" v-if="index !== staticTimeline.length - 1"></div>
            </div>

            <div class="timeline-static-card">
              <div class="timeline-static-date">{{ t.date }}</div>
              <div class="timeline-static-event">{{ t.event }}</div>
            </div>
          </div>
        </div>

        <div v-else class="timeline-empty">还没有生成结果</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimeLine {
  date: string;
  event: string;
}
import dayjs from "dayjs";
import { ref } from "vue";
const created = ref(false);
const timelineList = ref<TimeLine[]>([]); // 初始化空数组更安全
const staticTimeline = ref<TimeLine[]>([]);
const tl_ctx = ref<string>("");

const normalize_date = (value: string) => {
  const parsed = dayjs(value.trim());
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

const add_item_into_timeline = () => {
    timelineList.value.push({
        date:'',
        event:''
    })
}

const remove_timeline_item = (index: number) => {
  timelineList.value.splice(index, 1);
};

const generate_static_timeline = () => {
  timelineList.value = timelineList.value
    .map((item) => ({
      date: item.date.trim(),
      event: item.event.trim(),
    }))
    .filter((item) => item.date && item.event);

  staticTimeline.value = timelineList.value.map((item) => ({
    date: item.date,
    event: item.event,
  }));
};

const reset_timeline = () => {
  timelineList.value = [];
  staticTimeline.value = [];
  tl_ctx.value = "";
  created.value = false;
};

const create_timeline = () => {
  const str = tl_ctx.value?.trim();
  if (!str) return;

  const items = str.split(/\n/);
  timelineList.value = [];

  for (let item of items) {
    if (!item.trim()) continue;
    // 找到分隔符的位置
    const separatorIndex = item.indexOf(" - ");
    try {
      if (separatorIndex > -1) {
        const date = item.slice(0, separatorIndex);
        const event = item.slice(separatorIndex + 3);
        const normalizedDate = normalize_date(date);

        if (normalizedDate && event.trim()) {
          timelineList.value.push({
            date: normalizedDate,
            event: event.trim(),
          });
        }
      }
    } catch (e) {
      console.warn("格式错误");
    }
  }
  console.log("最终时间线对象数组：", timelineList.value);
  created.value = true;
};
</script>

<style lang="scss" scoped>
.timeline {
  width: 100%;
  min-height: 50vh;

  .timeline-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    gap: 16px;
    align-items: stretch;
    min-height: 50vh;
  }

  .timeline-panel {
    min-height: 50vh;
    max-height: 50vh;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .timeline-panel-title {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
  }

  .timeline-textarea {
    width: 100%;
    min-height: 300px;
  }

  .timeline-view {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;

    .timeline-item {
      position: relative;
    }

    .timeline-rail {
      width: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }

    .timeline-node {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: #111827;
      margin-top: 6px;
      z-index: 1;
    }

    .timeline-line {
      width: 2px;
      flex: 1;
      min-height: 56px;
      background: #d1d5db;
      margin-top: 4px;
    }

    .timeline-card {
      padding: 12px 14px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #fff;
    }

    .timeline-date {
      width: 140px;
    }
  }

  .timeline-right {
    overflow-y: auto;

    .timeline-static {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline-empty {
      color: #6b7280;
      font-size: 14px;
      padding: 12px 0;
    }
  }

  .timeline-static {
    padding: 0;
    overflow-y: auto;
    flex: 1;

    .timeline-static-item {
      display: flex;
      gap: 12px;
      align-items: stretch;
    }

    .timeline-static-rail {
      width: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }

    .timeline-static-node {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: #2563eb;
      margin-top: 8px;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
    }

    .timeline-static-line {
      width: 2px;
      flex: 1;
      min-height: 64px;
      margin-top: 4px;
      background: linear-gradient(180deg, #93c5fd 0%, #dbeafe 100%);
    }

    .timeline-static-card {
      flex: 1;
      min-height: 64px;
      padding: 14px 16px;
      border-radius: 14px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    }

    .timeline-static-date {
      font-size: 12px;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 6px;
    }

    .timeline-static-event {
      font-size: 14px;
      color: #111827;
      line-height: 1.6;
    }
  }
}

@media (max-width: 1200px) {
  .timeline {
    .timeline-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
