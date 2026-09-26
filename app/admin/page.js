import AdminApp from '@/components/admin/AdminApp'

export const metadata = {
  title: 'Admin | RIHANA DREAMS CARS',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <main className="relative min-h-screen bg-night pt-28 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
      <AdminApp />
    </main>
  )
}
