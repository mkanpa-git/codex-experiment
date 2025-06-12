interface Props {
  title: string
  content: string
}
export default function InfoBlock({ title, content }: Props) {
  return (
    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
