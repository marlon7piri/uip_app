import React from 'react'
interface Props {
  size: string,
  content: string,
  color?: string
}
export const Title = ({ size, content, color = 'text-slate-50' }: Props) => {
  return (
    <h1 className={`${size} text-center mb-4 ${color} font-bold`}>{content}</h1>
  )
}
