<template>
  <div class="hubcaro border rounded overflow-hidden">
    <BCarousel indicators>
      <BCarouselSlide>
        <template #img>
          <BImg
            width="400"
            height="200"
            src="https://picsum.photos/1024/480/?image=42"
            alt="image slot"
          />
        </template>
        
      </BCarouselSlide>
      <BCarouselSlide>
        <template #img>
          <BImg
            width="400"
            height="200"
            src="https://picsum.photos/1024/480/?image=40"
            alt="image slot"
          />
        </template>
        
      </BCarouselSlide>
      <BCarouselSlide>
        <template #img>
          <BImg
            width="400"
            height="200"
            src="https://picsum.photos/1024/480/?image=41"
            alt="image slot"
          />
        </template>
        
      </BCarouselSlide>
    </BCarousel>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.hubcaro {
  width: 400px;
  height: 200px;
}
</style>
