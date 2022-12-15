import {ChangeEvent, useState, useCallback, useMemo} from 'react'
import ChildArea from '../../../components/ChildArea'

const index = () => {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)

  const onChangeText = ((e: ChangeEvent<HTMLInputElement>) => setText(e.target.value))

  const onClickOpen = () => setOpen(!open)

  // Allow関数で書いた関数は同じ動作でも毎回再生成されてしまう
  // const onClickClose = () => setOpen(false)

  // useCallbackをつかって回避　useEffectと第二引数は同じ
  const onClickClose = useCallback(() => setOpen(false), [setOpen])

  //変数自体のメモ化
  const temp = useMemo(() => 1 + 5, [])

  return (
    <div>
      <input type="text" onChange={onChangeText} value={text} /><br /><br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClick={onClickClose} />
    </div>
  );
}

export default index
