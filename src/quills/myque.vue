<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Quill from 'quill'
import "quill/dist/quill.core.css";
const editorEl = ref<HTMLElement | null>(null)
let quill: Quill

onMounted(() => {
  if (!editorEl.value) return

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean']
  ]

  quill = new Quill(editorEl.value, {
    modules: { toolbar: toolbarOptions },
    theme: 'snow'
  })
})
</script>

<template>
  <div ref="editorEl"></div>
</template>
