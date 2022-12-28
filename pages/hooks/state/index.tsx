import { useState, MouseEvent } from "react"
// useStateを使用する理由

// onChangeのみが実行されていてindex()が再実行されていないので表示が変わらない
// const index = () => {
//   // 変数が再宣言されるので空になるので代入しても無意味
//   // そのためReactにコンポーネントの際レンダリングを依頼して値をどこかに保持する必要がある
//   let temp
//   return (
//     <div>
//       <input type="text" name="" id="" onChange={e => temp = e.target.value} />
//       {temp}
//     </div>
//   );
// }

// useStateの役割
// Hook into: Reactの内部と接続し状態を管理できるようにする
// 現在の値と更新関数の返却をし、更新関数でReactコンポーネントの再実行を依頼している

// const index = () => {
//   // 変数が再宣言されるので空になるので代入しても無意味
//   // そのためReactにコンポーネントの際レンダリングを依頼して値をどこかに保持する必要がある
//   console.log('再レンダリング')
//   const [temp, setTemp] = useState('')
//   return (
//     <div>
//       <input type="text" name="" id="" onChange={e => setTemp(e.target.value)} />
//       {temp}
//     </div>
//   )
// }

// const index = () => {
//   const [temp, setTemp] = useState(1)
//   const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
//     // 非同期処理　再生成時に処理がされるので２回目以降は無効
//     setTemp(temp + 1)
//     // setTemp(temp + 1)
//     setTemp(prev => prev + 1)
//   }
//   return (
//     <div>
//       <button onClick={handleClick}>ボタン</button>
//       {temp}
//     </div>
//   )
// }

const index = () => {
  const [temp, setTemp] = useState(
    [
      {
        'name': 'Sakai'
      },
      {
        'name': 'Yoshihara'
      },
      {
        'name': 'Komazawa'
      },
      {
        'name': 'Uchide'
      },
      {
        'name': 'Ohira'
      }
    ]
  )
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {

    // temp.push({ 'name': 'Asada' })
    // console.log(temp)
    // setTemp(temp)

    // 異なるオブジェクトを渡す必要がある Object.is()で判別（メソッドが２つが同一かを判断）
    // スプレッド演算子はシャローコピー
    //https://zenn.dev/takuya_naganuma/articles/8c4a7e68cd58e6

    const obj = [ ...temp, {'name': 'Adada'} ]
    setTemp(obj)
  }
  return (
    <div>
      <button onClick={handleClick}>ボタン</button>
      {temp.map((item, index) => <div key={index}>{item.name}</div>)}
    </div>
  )
}

export default index
