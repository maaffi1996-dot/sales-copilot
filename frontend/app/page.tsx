import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StepFlow from "@/components/StepFlow";
import DemoUpload from "@/components/DemoUpload";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StepFlow />
      <DemoUpload />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
