import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ignite from "@/components/Ignite";
import {
  About,
  Collab,
  Contact,
  Faq,
  Footer,
  Invisible,
  Panel,
  Products,
  Ticker,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Ignite />
        <Invisible />
        <Panel />
        <Products />
        <Collab />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
