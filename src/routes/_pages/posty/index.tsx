import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pages/posty/')({
  component: () => <div>Hello /_pages/posty/!</div>,
})
