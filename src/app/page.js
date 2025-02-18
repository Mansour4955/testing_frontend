import Image from "next/image";
import heroImage from "../../public/heroImage.webp";
import Events from "@/components/custom/Events";
export default function Home() {
  return (
    <div className="w-full flex flex-col gap-y-10 max-md:gap-y-8 max-sm:gap-y-6">
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
    </div>
  );
}
