import {FC, memo, MouseEvent} from 'react'

const style = {
  width: "100%",
  height: "20px",
  backgroundColor: "red"
}

type PropsType = {
  open: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

// const ChildArea: FC<PropsType> = ({ open, onClick }) => {
//   console.log('ChildArea is render...')
//   const temp = Array.from(Array(2000).keys())
//   const data = [...temp]
//   data.forEach(() => {
//     console.log('...')
//   })
//   return (
//     <>
//       {open ? <div style={style}>ChildArea</div> : <></>}
//     </>
//   )
// }

const ChildArea: FC<PropsType> = memo(({ open, onClick }) => {
  console.log('ChildArea is render...')
  const temp = Array.from(Array(2000).keys())
  const data = [...temp]
  data.forEach(() => {
    console.log('...')
  })
  return (
    <>
      {open ? <div style={style}>ChildArea<div><button onClick={onClick}>閉じる</button></div></div> : <></>}
    </>
  )
})

// 基本的にmemo化していい（一番小さい粒度のコンポーネントまではしなくてもいい）
// memo化するコストもあるので複数の要素で成り立っているコンポーネントや今後肥大化予想されるコンポーネントはmemo化する

export default ChildArea
