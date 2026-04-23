import { Audiences } from "@/components/Audiences";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { QuietInstruments } from "@/components/QuietInstruments";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <QuietInstruments />
        <Audiences />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
