import { Suspense } from "react";
import Router from "./routers/Routers";
import Navbar from "@/components/navbar";
import FullScreenLoader from "@/components/loader/FullScreenLoader/FullScreenLoader";

function App() {
  /**
   * TSX
   */
  return (
    <div>
      <Navbar />
      <Suspense fallback={<FullScreenLoader />}>
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
