import HeroSection from './sections/HomeHero';
import AboutSection from './sections/AboutUs';
import GroupSection from './sections/Group';
import FoundersSection from './sections/Founders';
import ImpactSection from './sections/Impact';
import NewsSection from './sections/News';
import CTASection from './sections/Cta';
import CompanySection from './sections/CompanySection';
import AgencyHero from './sections/agency/AgencyHero';
import AgencyContent from './sections/agency/AgencyContent';
import AgencyCeo from './sections/agency/AgencyCEO';
import AgencyOffering from './sections/agency/AgencyOffering';
import InnerHeroSection from './sections/innerpage/InnerHeroSection'
import InnerVisionSection from './sections/innerpage/InnerVisionSection';
import InnerOurEcosystem from './sections/innerpage/InnerOurEcosystem';
import BoardOfDirectors from './sections/innerpage/BoardOfDirectors';
import CeoSection from './sections/innerpage/CeoSection';
import ContactFounder from './sections/innerpage/ContacFounder';
import ContactCeo from './sections/innerpage/ContactCEO';
import ContactAboutSection from './sections/innerpage/ContactAbout';

export default function PageBuilder({ blocks }) {
  if (!Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, index) => {
       const layout = block.acf_fc_layout || block.layout;


        switch (layout) {
          case 'home_hero':
            return <HeroSection key={index} data={block} />;
          case 'about_us_section':
            return <AboutSection key={index} data={block} />;
          case 'group_section':
            return <GroupSection key={index} data={block} />;
          case 'founders_section':
            return <FoundersSection key={index} data={block} />;
          case 'impact_section':
            return <ImpactSection key={index} data={block} />;
          case 'news_section':
            return <NewsSection key={index} data={block} />; 
           case 'cta_section':
             return <CTASection key={index} data={block} />;
          case 'company_section':
            return <CompanySection key={index} data={block} />;
          case 'agency_hero_section':
            return <AgencyHero key={index} data={block} />;
          case 'agency_content_section':
            return <AgencyContent key={index} data={block} />;  
          case 'agency_ceo_section':
            return <AgencyCeo key={index} data={block} />;
          case 'agency_offering_section' :
            return <AgencyOffering key={index} data={block} />;    
          case 'inner_hero_section':
            return <InnerHeroSection key={index} data={block} />;   
          case 'inner_vision_section':
            return <InnerVisionSection key={index} data={block} />;   
          case 'inner_our_ecosystem':
            return <InnerOurEcosystem key={index} data={block} />;
          case 'board_of_directors':
            return <BoardOfDirectors key={index} data={block} />;
          case 'ceo_section':
            return <CeoSection key={index} data={block} />;
          case 'inner_founder_section':
            return <ContactFounder key={index} data={block} />;
          case 'contact_ceo_section':
            return <ContactCeo key={index} data={block} />;
          case 'contact_get_in_touch_section':
            return <ContactAboutSection key={index} data={block} />;  
          default:
            return null;
        }
      })}
    </>
  );
}
