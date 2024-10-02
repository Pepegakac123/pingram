import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pages/edytuj-post/$postid')({
  component: () => <div>Hello /_pages/edytuj-post/$postid!</div>,
})
