import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AGENTS, getAgentBySlug } from '@/lib/agents'
import AgentProfileClient from './AgentProfileClient'

export async function generateStaticParams() {
  return AGENTS.map((agent) => ({ slug: agent.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function AgentProfilePage({ params }: PageProps) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)

  if (!agent) {
    notFound()
  }

  return <AgentProfileClient agent={agent} />
}
