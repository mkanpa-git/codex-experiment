import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Childcare Voucher Application</h1>
      <Link href="/application" className="text-blue-600 underline">
        Start Application
      </Link>
    </div>
  )
}
