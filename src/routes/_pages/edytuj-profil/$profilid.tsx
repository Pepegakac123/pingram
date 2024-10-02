import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pages/edytuj-profil/$profilid')({
  component: () => <div>Hello /_pages/edytuj-profil/$profilid!</div>,
})
