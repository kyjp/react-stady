import {ChangeEvent, useReducer, useState} from 'react'

const index = () => {

  //第二引数で初期値
  // stateの管理をスッキリさせる（処理ごとまとめて宣言）
  // 非依存な純粋関数なので単体テストがかきやすい（コンポーネントからきりはなしやすい）
  // https://zenn.dev/sorye/articles/difference-between-usestate-and-usereducer
  // useStateとは次の操作の指示（次にどんな状態になるべきかを知る必要がある）　状態の更新方法は利用側に託す
  // useReducerは次の実行する操作を指定（操作の中身を知る必要はない、ブラックボックス化できる）　状態の更新方法も状態側で担当する　バグを予防しやすい
  // 第一引数（stateの内容、どの処理を実行するか定義）
  const [state, dispatch] = useReducer((_: string, action: string) => {
    switch (true) {
      case action === 'sakai':
        return 'チーフ'
      default:
        return 'エンジニア'
    }
  }, 'エンジニア')

  const [position, setPosition] = useState('エンジニア')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 場合によっては純粋関数にならない
    setPosition(e.target.value == 'sakai' ? 'チーフ' : 'エンジニア')
  }

  return (
    <div>
      <div>
        <p>
          useReducer
        </p>
        <input type="text" onChange={e => dispatch(e.target.value)} />
        役職：{state}
      </div>
      <div>
        <p>
          useState
        </p>
        <input type="text" onChange={handleChange} />
        役職：{position}
      </div>
    </div>
  );
}

export default index
