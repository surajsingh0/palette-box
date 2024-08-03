import "./App.css";
import PaletteView from "./components/PaletteView";
import { ShadeProvider } from "./context/ShadeContext";

function App() {
    return (
        <ShadeProvider>
            <PaletteView />
        </ShadeProvider>
    );
}

export default App;
