import dynamic from 'next/dynamic'
const FormRenderer = dynamic(() => import('../components/FormRenderer'), { ssr: false })

export default function Application() {
  return <FormRenderer />
}
