import { Toaster } from "react-hot-toast";
import PagesRouter from "./PagesRouter";

function App() {
  return (
    <div className="App min-h-screen">
      <PagesRouter />
      <Toaster />
    </div>
  );
}

export default App;
