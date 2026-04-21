import { Audiences } from "@/components/Audiences";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Pillars } from "@/components/Pillars";
import { Proof } from "@/components/Proof";
import { ScrollDemo } from "@/components/ScrollDemo";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollDemo />
        <Pillars />
        <Audiences />
        <Proof />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
