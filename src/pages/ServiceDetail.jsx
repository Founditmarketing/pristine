import { useParams } from 'react-router'
import { PageStub } from './PageStub'
import { services } from '@/data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <PageStub
        eyebrow="Not found"
        title="That service does not exist."
        blurb="Try the services overview to see everything we offer."
      />
    )
  }

  return (
    <PageStub
      eyebrow="Service"
      title={service.title}
      blurb={service.short}
    />
  )
}
