import React from 'react'
interface Props {
  size: string,
  content: string
}
export const Title = ({ size, content }: Props) => {
  return (
    <h1 className={`${size} text-center mb-4 text-slate-50 font-bold`}>{content}</h1>
  )
}
