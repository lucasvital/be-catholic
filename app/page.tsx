import Navbar from '@/components/Navbar';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';
import SectionIndicator from '@/components/SectionIndicator';
import ScrollThread from '@/components/ScrollThread';
import LatinStamp from '@/components/LatinStamp';
import SacredDivider from '@/components/SacredDivider';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Gallery from '@/components/sections/Gallery';
import Pillars from '@/components/sections/Pillars';
import Verse from '@/components/sections/Verse';
import Stats from '@/components/sections/Stats';
import Prayer from '@/components/sections/Prayer';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <main style={{ background: '#0A0A0A' }}>
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <ScrollThread />
      <SectionIndicator />
      <LatinStamp />

      <div id="sec-principium"><Hero /></div>
      <div id="sec-manifestum"><Manifesto /></div>
      <SacredDivider glyph="chi-rho" size="md" background="#080808" padding="4rem 2rem" />
      <div id="sec-imagines"><Gallery /></div>
      <div id="sec-columnae"><Pillars /></div>
      <SacredDivider glyph="cross-pattee" size="md" background="#0A0A0A" padding="4rem 2rem" />
      <div id="sec-verbum"><Verse /></div>
      <div id="sec-historia"><Stats /></div>
      <SacredDivider glyph="fleur-de-lis" size="md" background="#0A0A0A" padding="4rem 2rem" />
      <div id="sec-oratio"><Prayer /></div>
      <SacredDivider glyph="ihs" size="md" background="#080808" padding="4rem 2rem" />
      <div id="sec-vocatio"><CTA /></div>
    </main>
  );
}
