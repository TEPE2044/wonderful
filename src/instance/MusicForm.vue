<template>
  <div class="music-form p-2">
    <!-- <section class="post-type-section">
      <p class="text-muted mb-2">是否原创?（这很重要，请谨慎选择）</p>
      <div class="btn-group" role="group">
        <input id="original" type="radio" class="btn-check" value="0" />
        <label class="btn btn-outline-primary" for="original">原创</label>

        <input id="repost" type="radio" class="btn-check" value="1" />
        <label class="btn btn-outline-primary" for="repost">转载</label>
      </div>
    </section> -->

    <section>
      <div>
        <BInputGroup>
          <BFormInput
            v-model="selectedProductCode"
            type="text"
            list="product-list"
            placeholder="搜索歌曲歌曲"
            :disabled="confirm"
          />
          <template #append>
            <BButton @click="toggleConfirm()">确定</BButton>
          </template>
        </BInputGroup>

        <BFormDatalist
          id="product-list"
          :options="apiProducts"
          value-field="productCode"
          text-field="productName"
          disabled-field="discontinued"
        />
        <div class="mt-3">
          Selected: <strong>{{ selectedProductCode }}</strong>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { ref } from "vue";

const [confirm, toggleConfirm] = useToggle();


interface ApiProduct {
  productCode: string;
  productName: string;
  category: string;
  discontinued?: boolean;
}

// Simulated API response
const apiProducts: ApiProduct[] = [
  { productCode: "PROD-001", productName: "Widget A", category: "Hardware" },
  { productCode: "Man-Dick", productName: "sdget B", category: "Sex Toy" },
  { productCode: "PROD-002", productName: "Gadget B", category: "Electronics" },
  {
    productCode: "PROD-003",
    productName: "Tool C",
    category: "Hardware",
    discontinued: true,
  },
];

// TypeScript knows selectedProductCode is a string (matching productCode field type)
const selectedProductCode = ref<string>();
const audioFile = ref<File | null>(null);
/** 处理音频上传 */
const handleAudioUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  audioFile.value = target.files?.[0] || null;
};
</script>

<style lang="scss" scoped></style>
