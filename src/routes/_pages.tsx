import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pages')({
  component: () => <div>Hello /_root/_pages!</div>,
})
