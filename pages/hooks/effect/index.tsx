import {useState, useEffect, useLayoutEffect} from 'react'

//useEffect: レンダリング→レンダリング結果をDOMに反映→DOMを画面に反映→コールバック関数を実行
//useLayoutEffect: レンダリング→レンダリング結果をDOMに反映→コールバック関数を実行→DOMを画面に反映


// const index = () => {
//   const [time, setTime] = useState(0)

//   // 再レンダリング時にタイマーが生成されるため、秒数の進み方がおかしくなる Nextではできない　useEffectの第二引数を消した場合もおなじことになる
//   window.setInterval(() => {
//     setTime(prev => prev + 1)
//   })

//   return (
//     <div>
//       <time>{time}</time><span>秒経過</span>
//     </div>
//   );
// }

// const index = () => {
//   const [time, setTime] = useState(0)

//   // 第二引数に空配列を渡すと初回読み込み時のみ呼び出される
//   // React 18 から、厳密モードが有効になっている開発モードでのみ useEffect が 2 回実行されるようになった。
//   // next: v12.2.2
//   // react: v18.2.0
//   // react-dom: v18.2.0
//   // https://b.0218.jp/202207202243.html
//   useEffect(() => {
//     console.log('useEffect is called')
//     window.setInterval(() => {
//       setTime(prev => prev + 1)
//     })
//     return () => {
//       // アンマウント時
//     }
//   }, [])

//   // 依存配列　watchとおなじ stateの更新に伴って更新する　依存するstateの値をこの処理の中で行うと無限ループが発生するので注意
//   // 条件を加えることによって最適化している
//   useEffect(() => {
//     console.log('updated')
//   }, [time])

//   return (
//     <div>
//       <time>{time}</time><span>秒経過</span>
//     </div>
//   )
// }


const Item = () => {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const setMousePosition = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  //依存配列を設定するとuseEffect実行前にreturnの中身が実行される
  // 再レンダリング後もコンポーネントが残っている場合
  //レンダリング2 → レンダリング2の結果がDOMに反映 → DOMが画面に反映 → クリーンナップ関数1 → コールバック関数2
  // アンマウントされる場合
  // レンダリング2 → レンダリング2の結果がDOMに反映 → DOMが画面に反映 → クリーンナップ関数1
  useEffect(() => {
    // mounted or updated
    console.log('useEffectが呼ばれた')
    document.addEventListener('mousemove', setMousePosition)
    let id: any = null
    id = window.setInterval(() => {
      console.log('test')
    })
    return () => {
      // unmounted
      // 登録された処理を解除するときなどに使う メモリリークを防ぐ
      console.log('アンマウント時 クリーンナップ　useEffectの処理の後始末')
      window.clearInterval(id)
      window.removeEventListener('mousemove', setMousePosition)
    }
  }, [])

  // render 一番初めに呼ばれる

  return (
    <div>
      <ul>
        <li>
          x座標: {x}
        </li>
        <li>
          y座標: {y}
        </li>
      </ul>
    </div>
  )
}

const index = () => {
  const [trigger, setTrigger] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(1)
  }, [])

  useLayoutEffect(() => {
    // DOMに反映される前に実行
    setCount(1)
  }, [])

  return (
    <div>
      {count}
      {trigger && <Item />}
      <button onClick={e => setTrigger(prev => !prev)}>ボタン</button>
    </div>
  )
}


export default index
