import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pages/profile/$profileId')({
  component: () => <div>Hello /_pages/profile/$profileId!</div>,
})
