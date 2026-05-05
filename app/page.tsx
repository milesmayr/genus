import HeroSection from '@/components/home/HeroSection'
import ProblemSection from '@/components/home/ProblemSection'
import SolutionSection from '@/components/home/SolutionSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import AmbassadorSection from '@/components/home/AmbassadorSection'
import ClientSection from '@/components/home/ClientSection'
import MatchSection from '@/components/home/MatchSection'
import CloseSection from '@/components/home/CloseSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <AmbassadorSection />
      <ClientSection />
      <MatchSection />
      <CloseSection />
    </main>
  )
}
