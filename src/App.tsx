import { createContext } from "react";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Step 1: Create a Context with a default value
export const AddContext = createContext<boolean | undefined>(undefined);

function App() {
  return (
    <div className="w-screen h-screen">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
