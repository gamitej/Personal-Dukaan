import { Suspense } from "react";
import Router from "./routers/Routers";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import FullScreenLoader from "@/components/loader/FullScreenLoader/FullScreenLoader";

function App() {
  /**
   * TSX
   */
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<FullScreenLoader />}>
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
