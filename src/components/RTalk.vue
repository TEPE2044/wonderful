<script setup lang="ts">
// TODO:1.获取联系人列表接口 2.在未选择任何联系人时缺省页 3.点击联系人后获取聊天记录接口 4.发送消息接口

</script>

<template>
    <div class="rtalk px-5 mx-auto mt-3">

        
        <div class="rt-sidebar">
            <div class="contacts border rounded d-flex flex-row align-items-center gap-4 p-1 ps-3 mb-2 mt-3" v-for="i in 8" :key="i">
                <div class="avatar">
                    <BAvatar />
                </div>
                <div class="detail">
                    <div class="username">梦璃東111111111111111111111111111111111111111111</div>
                </div>
            </div>
        </div>

        <div class="rt-main">
            <Dialog/>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.rtalk {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 2rem;
    width: 100rem;
    height: 700px;
    .rt-sidebar {
        padding-left: 0.5rem;
        max-height: 750px;
        overflow-y: auto;
        overflow-x: hidden;
        overflow-anchor: none;
        // 将滚动条移到左侧
        direction: rtl;
        // Firefox 滚动条样式
        scrollbar-width: thin;
        scrollbar-color: firebrick transparent;

        // WebKit 滚动条样式 (Chrome/Edge/Safari)
        &::-webkit-scrollbar {
            width: 8px;
            background: transparent;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #9aa0a6;
            border-radius: 6px;
            border: 2px solid transparent;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280;
        }

        // 恢复内容方向，避免 RTL 影响布局
        > * {
            direction: ltr;
        }

        .contacts {
            height: 60px;
            background-color: rgba(255, 255, 255, 0.47);
            transition: transform 0.3s ease;
            will-change: transform;
            .detail {
                .username {
                    width: 100px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;

                }
            }

            &:hover {
                cursor: pointer;
                transform: scale(1.02);
            }
        }
    }
}
</style>