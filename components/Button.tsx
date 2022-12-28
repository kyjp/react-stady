import { FC, ReactNode, MouseEvent, memo } from 'react'

type ButtonType = {
  children: ReactNode
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<ButtonType> = memo(({
  children,
  onClick
}) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
})

export default Button
