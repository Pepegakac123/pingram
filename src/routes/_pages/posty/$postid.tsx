import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pages/posty/$postid')({
  component: () => <div>Hello /_pages/posty/$postid!</div>,
})
