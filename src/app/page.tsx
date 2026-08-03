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
import { getFaq, getProducts } from "@/lib/api";

export default async function Home() {
  const [products, faq] = await Promise.all([getProducts(), getFaq()]);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Ignite />
        <Invisible />
        <Panel />
        <Products products={products} />
        <Collab />
        <About />
        <Faq items={faq} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
