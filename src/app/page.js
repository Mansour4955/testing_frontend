import Image from "next/image";
import heroImage from "../../public/heroImage.webp";
import Events from "@/components/custom/Events";
import SeeMoreEvents from "@/components/custom/SeeMoreEvents";
export default function Home() {
  return (
    <div>
      <Image
        priority
        src={heroImage}
        alt="heroImage"
        layout="responsive" // Ensures the image maintains its aspect ratio
        width={320}
        height={500}
        className="w-full max-h-[50vh] object-cover object-top"
      />
      <Events parent="homePage" />
      <SeeMoreEvents/>
    </div>
  );
}
