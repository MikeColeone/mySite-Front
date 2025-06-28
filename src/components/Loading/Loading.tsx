// src/components/Loading.tsx
import React from 'react'
import useLoadingStore from '@/store/modules/useLoadingStore'
import './Loadind.scss'

const Loading: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <div className="loading">
      <div className="load-box">
        <img
          className="loading-img"
          src="https://image.kuailemao.xyz/blog/loading/loading-gif.gif"
          alt="Loading"
          draggable={false}
        />
        <span>比卡丘正在带着数据走向你~~</span>
      </div>
    </div>
  )
}

export default Loading
