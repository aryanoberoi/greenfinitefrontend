import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import UploadPage from "./UploadPage"; // or import UploadForm if extracted
import AboutUs from "./AboutUs";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{backgroundColor: "#F8F7F2", backgroundSize: "cover" }}
    >
      <div className="w-screen">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex justify-center items-center">
            <UploadPage />
          </main>
          <main>
            <AboutUs />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
