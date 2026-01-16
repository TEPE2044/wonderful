import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Howl } from "howler";
export interface QueueItem {
  cover: string;
  songURL: string;
}

export const playerStore = defineStore("player", () => {
  //播放模式
  const mode = ref<string>("loop");
  /* 播放列表 
  增删
  1. playList 列表
  2. playListLength 列表长度
  3. nowIndex 当前播放位置
  5.删除后进行下一首
  */

  const playList = ref<Array<QueueItem>>([]);
  const playListLength = computed(() => playList.value.length);
  const currentIndex = ref<number>(0);
  // 不重复增加
  const addIntoPlayList = (data: QueueItem) => {
    // 没法用included，includes比较的是对象引用，而data每次都是新创建的对象（即使内容一样），引用地址不同
    let isExisted = playList.value.some(
      (song) => song.songURL === data.songURL
    );
    console.log(isExisted);
    if (isExisted === false) {
      playList.value.push(data);
      console.log(playList.value);
    }
  };
  // 删除
  const removeFromPlayList = (idx: number) => {
    playList.value = playList.value.filter(
      (song) => song !== playList.value[idx]
    );
    console.log(playList.value);
  };
  // 删除全部
  const removeAll = () => {
    playList.value = [];
    console.log(playList.value);
  };
  // 批量删除
  // const removeSelectedSongs = (idxArr:Array<number>) => {
  //   playList.value = playList.value.filter((_, i) => !idxArr.includes(i));
  //   console.log(playList.value);
  // };

  // 播放状态
  const isPlay = ref<boolean>(false);
  // 播放器就绪
  const isReady = ref<boolean>(false);

  /*声音控制组*/
  // 是否静音
  const muted = ref<boolean>(false);
  // 音量 TODO:默认是40，后面存入localstorage，保存用户的设定
  const volume = ref<number>(40);
  // 保存按钮
  const tempVolume = ref<number>(0);

  const createPlayer = () => {
    return new Howl({
      src: [playList.value[currentIndex.value]?.songURL as string],
      autoplay: false,
      volume: volume.value / 100,
      onend: () => {
        console.log("歌曲结束");
        isPlay.value = false;
      },
      onplay: () => {
        isPlay.value = true;
        console.log("开始播放");
      },
      onpause: () => {
        isPlay.value = false;
        console.log("暂停播放");
      },
    });
  };
  const initPlayList = (data: Array<QueueItem>) => {
    playList.value = data;
    currentIndex.value = 0;
  };
  const handleMuted = () => {
    muted.value = !muted.value;
    if (muted.value === true) {
      tempVolume.value = volume.value;
      volume.value = 0;
    } else {
      volume.value = tempVolume.value;
    }
  };
  const togglePlay = (player: any) => {
    isPlay.value = !isPlay.value;
    if (isPlay.value === true) {
      player.play();
    } else {
      player.pause();
    }
  };
  // 下一首 TODO:如果有下一首，获取下一首的进行播放,先卸载unload，然后src重新设置
  // const nextSong = (player: any) => {};
  // const frontSong = (player: any) => {};

  return {
    playList,
    isPlay,
    isReady,
    volume,
    muted,
    mode,
    currentIndex,
    initPlayList,
    togglePlay,
    handleMuted,
    addIntoPlayList,
    removeFromPlayList,
    removeAll,
    createPlayer
  };
});
