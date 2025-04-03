import { RootComponent } from "./components/RootComponent";
import { NotFoundComponent } from "./components/NotFoundComponent";
import { CanvasComponent } from "./components/CanvasComponent";
import { InventoryComponent } from "./components/InventoryComponent";
import { PlattegrondComponent } from "./components/PlattegrondComponent";
import { NotebookComponent } from "./components/NotebookComponent";
import { MenuComponent } from "./components/MenuComponent";

// Expose the web components to the browser
window.customElements.define("game-root", RootComponent);
window.customElements.define("game-notfound", NotFoundComponent);
window.customElements.define("game-canvas", CanvasComponent);
window.customElements.define("game-inventory", InventoryComponent);
window.customElements.define("game-plattegrond", PlattegrondComponent);
window.customElements.define("game-notebook", NotebookComponent);
window.customElements.define("menu-component", MenuComponent);
