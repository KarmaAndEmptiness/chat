import React from 'react'
import '../scss/home'
import '../scss/base'
import '../scss/index'
import '../assets/fonts/iconfont'
import avatar from '../assets/img/avatar.png'
const App = () => {
    return (
        <>
            <div className='bg-sky'><span>hola</span></div>
            <div className='bg-pink'><span>你好</span>
                <span className='iconfont icon-qunxinxi'></span>
            </div>
            <img src={avatar} alt="avatar" />
        </>
    )
}
export default App