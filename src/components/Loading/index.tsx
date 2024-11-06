import { FC, HTMLAttributes } from 'react'
import { LoadingWrapper } from './styles'

type LoadingProps = {
  isVisible?: boolean
  spanProps?: HTMLAttributes<HTMLSpanElement> & Record<string, unknown>
}

export const Loading: FC<LoadingProps> = ({ isVisible = false, spanProps }) => {
  if (!isVisible) return null

  return <LoadingWrapper {...spanProps} />
}
