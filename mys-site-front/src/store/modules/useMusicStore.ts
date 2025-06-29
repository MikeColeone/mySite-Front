import create from 'zustand'
import { persist } from 'zustand/middleware'

// 枚举和工具函数导入（你需要自己实现或者改写）
import { MODELLIST, PLAYTYPE, LYRICTYPE } from '@/utils/enum'
import {
  getNextMusic,
  calcMusicCurrentTime,
  calcMusicSchedule,
  getMusicDetail,
  getLyric,
  getMusicDescription,
} from '@/components/Music/musicTool'

import blogAvatar from '@/assets/images/blogAvatar.svg'

// 音频实例单例
const audio = new Audio()

type MusicInfo = {
  id: string
  url: string
  lyricList: string[]
  lyricTimeList: number[]
}

type MusicDescription = {
  al: { picUrl: string }
  name: string
  ar: { name: string }[]
}

interface MusicState {
  volume: number
  isPaused: boolean
  currentTime: number
  duration: number
  musicInfo: MusicInfo
  musicDescription: MusicDescription
  lyricType: string
  showLyricBoard: boolean
  currentLyticIndex: number
  isShow: boolean
  isToggleImg: boolean
  playType: string
  playModel: string
  musicList: any[]
  customerMusicList: any[]
  currentSchedule: number
  isUseProgress: boolean
  isClickLyric: boolean

  // actions
  init: () => void
  clear: () => void
  setPlay: (isInit?: boolean) => void
  togglePlay: () => void
  setNext: (flag?: boolean) => void
  setMusicInfo: (id: string, isInit?: boolean) => Promise<void>
  setMusicDescription: (val: MusicDescription) => void
  setMusicList: (list: any[]) => void
  setCurrentTime: (progress: number) => void
  setCurrentTimeByClickLyric: (index: number) => void
  setVolume: (progress: number) => void
  setShowLyricBoard: (val: boolean) => void
  setIsShow: () => void
  setCustomerMusicList: (type: 'add' | 'delete', music: any) => void
  setIsToggleImg: (val: boolean) => void
  setLyricType: (val: keyof typeof LYRICTYPE) => void
  setPlayType: (type: string) => void
  setPlayModel: (model: string) => void
  setIsUseProgress: (val: boolean) => void
}

const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      volume: 0.5,
      isPaused: true,
      currentTime: 0,
      duration: 0,
      musicInfo: {
        id: '',
        url: '',
        lyricList: [''],
        lyricTimeList: [],
      },
      musicDescription: {
        al: { picUrl: blogAvatar },
        name: '',
        ar: [{ name: '听音乐吧~' }],
      },
      lyricType: LYRICTYPE.COMMON,
      showLyricBoard: false,
      currentLyticIndex: 0,
      isShow: false,
      isToggleImg: false,
      playType: PLAYTYPE.TOP,
      playModel: MODELLIST[0],
      musicList: [],
      customerMusicList: [],
      currentSchedule: 0,
      isUseProgress: false,
      isClickLyric: false,

      // 初始化音频播放器
      init: () => {
        audio.volume = get().volume
        audio.loop = false
        audio.autoplay = true
        audio.preload = 'auto'
        audio.crossOrigin = 'anonymous'

        audio.ontimeupdate = () => {
          if (audio.currentTime) {
            set({ currentTime: audio.currentTime })
          }
          if (get().isPaused !== audio.paused) {
            set({ isPaused: audio.paused })
          }
          if (get().duration !== audio.duration) {
            set({ duration: audio.duration })
          }

          if (!get().isClickLyric) {
            const index = get().musicInfo.lyricTimeList.findIndex(
              (v) => v >= audio.currentTime * 1000
            )
            set({ currentLyticIndex: index - 1 || 0 })
          }
          if (!get().isUseProgress) {
            set({
              currentSchedule: calcMusicSchedule(audio.currentTime, audio.duration),
            })
          }
          if (audio.ended) {
            get().setNext(true)
          }
        }

        if (get().musicInfo.id) {
          get().setMusicInfo(get().musicInfo.id, true)
        }
      },

      clear: () => {
        set({ duration: 0, currentLyticIndex: 0 })
      },

      setPlay: async (isInit = false) => {
        get().clear()

        if (isInit) {
          audio.currentTime = get().currentTime
        } else {
          audio.currentTime = 0
          set({ currentTime: 0 })
        }

        set({ isToggleImg: true })

        try {
          await audio.play()
          set({ isPaused: false, isToggleImg: false })
          if (isInit && get().isPaused) {
            audio.pause()
          }
        } catch (e) {
          set({ isPaused: true })
          console.error(e)
        }
      },

      togglePlay: () => {
        set({ isToggleImg: false })
        if (get().isPaused) {
          audio
            .play()
            .then(() => set({ isPaused: false }))
            .catch(console.error)
        } else {
          audio.pause()
          set({ isPaused: true })
        }
      },

      setNext: (flag = true) => {
        let list = get().musicList
        if (get().playType === PLAYTYPE.CUSTOM) {
          list = get().customerMusicList
        }
        const len = list.length
        let index = list.findIndex((item) => item.id === get().musicInfo.id)
        if (index === -1) index = 0

        const musicIndex = getNextMusic(len, index, get().playModel, flag)
        get().setMusicInfo(list[musicIndex].id)
      },

      setMusicInfo: async (id, isInit = false) => {
        if (!id) return

        const des = await getMusicDescription(id)
        if (des) {
          get().setMusicDescription(des[0])
        }

        const musicDetail = await getMusicDetail(id)
        const lyric = await getLyric(id)

        audio.src = musicDetail.url

        set({
          musicInfo: {
            id,
            url: musicDetail.url,
            lyricList: lyric.lyricList,
            lyricTimeList: lyric.lyricTimeList,
          },
        })

        await get().setPlay(isInit)
      },

      setMusicDescription: (val) => {
        set({ musicDescription: val })
      },

      setMusicList: (list) => {
        set({ musicList: list })
      },

      setCurrentTime: (progress) => {
        const time = calcMusicCurrentTime(progress, audio.duration)
        audio.currentTime = time
        set({ currentTime: time })

        const index = get().musicInfo.lyricTimeList.findIndex(
          (v) => v >= audio.currentTime * 1000
        )
        set({ currentLyticIndex: index - 1 || 0 })

        if (audio.paused) {
          get().togglePlay()
        }
        setTimeout(() => set({ isUseProgress: false }), 200)
      },

      setCurrentTimeByClickLyric: (index) => {
        set({ isClickLyric: true })
        const time = get().musicInfo.lyricTimeList[index]
        audio.currentTime = time / 1000
        set({ currentTime: time / 1000 })

        if (audio.paused) {
          get().togglePlay()
        }
        setTimeout(() => set({ isClickLyric: false }), 100)
      },

      setVolume: (progress) => {
        const volume = Math.round((progress / 100) * 100) / 100
        audio.volume = volume
        set({ volume })
      },

      setShowLyricBoard: (val) => set({ showLyricBoard: val }),

      setIsShow: () => set({ isShow: !get().isShow }),

      setCustomerMusicList: (type, music) => {
        if (type === 'add') {
          set((state) => ({
            customerMusicList: [...state.customerMusicList, music],
          }))
        } else if (type === 'delete') {
          set((state) => {
            const newList = state.customerMusicList.filter((item) => item.id !== music.id)
            if (newList.length === 0) {
              set({ playType: PLAYTYPE.TOP })
            }
            return { customerMusicList: newList }
          })
        }
      },

      setIsToggleImg: (val) => set({ isToggleImg: val }),

      setLyricType: (val) => set({ lyricType: LYRICTYPE[val] }),

      setPlayType: (type) => set({ playType: type }),

      setPlayModel: (model) => set({ playModel: model }),

      setIsUseProgress: (val) => set({ isUseProgress: val }),
    }),
    {
      name: 'musicState', // localStorage key
      getStorage: () => localStorage,
    }
  )
)

export default useMusicStore
