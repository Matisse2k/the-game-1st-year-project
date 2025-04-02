import { css } from "../helpers/webComponents";
/** CSS affecting the {@link NotebookComponent} */
const styles: string = css`
  :host {
  display: flex;
  width: 80%;
  height: 85%;
  position: absolute;
  top: 7%;
  left: 10%;
  flex-direction: column;
  font-family: "Cinzel", serif;
  perspective: 1200px;
}

.book {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  transform: rotateX(5deg);
  transform-style: preserve-3d;
  position: relative;
}

.book::before {
  content: '';
  position: absolute;
  width: 98%;
  height: 98%;
  left: 1%;
  top: 1%;
  background: linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0));
  z-index: -1;
  border-radius: 15px;
}

.page {
  position: relative;
  width: 48%;
  height: 100%;
  padding: 30px;
  background: #f2e8c9 linear-gradient(to bottom, rgba(210, 180, 140, 0.2) 1px, transparent 1px);
  background-size: 20px 20px;
  box-sizing: border-box;
  color: #3e2a1e;
  overflow: hidden;
  transform-style: preserve-3d;
}

.page:first-child {
  box-shadow: inset -15px 0 30px -15px rgba(0, 0, 0, 0.5);
}

.page:last-child {
  box-shadow: none; /* Verwijdert ongewenste schaduw */
}

.page::before, .page::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.page::before {
  inset: 0;
  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 1px);
}

.page::after {
  inset: 10px;
  border: 2px solid rgba(139, 69, 19, 0.15);
  border-radius: 5px;
}

.spine {
  position: absolute;
  width: 50px;
  height: 103%;
  background: linear-gradient(to right, #8b4513, #a0522d, #8b4513);
  top: -1.5%;
  left: 50%;
  transform: translateX(-50%) translateZ(-20px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  z-index: -1;
  border-radius: 5px;
}

.spine::after {
  content: '';
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  height: 80%;
  background-image: repeating-linear-gradient(to bottom, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 22px);
}

/* Page corners */
.page-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  pointer-events: none;
  border-width: 3px;
  border-style: solid;
  border-color: rgba(139, 69, 19, 0.3);
}

.page-corner-tl {
  top: 5px;
  left: 5px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 5px;
}

.page-corner-tr {
  top: 5px;
  right: 5px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 5px;
}

.page-corner-bl {
  bottom: 5px;
  left: 5px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 5px;
}

.page-corner-br {
  bottom: 5px;
  right: 5px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 5px;
}

.page textarea {
  width: 100%;
  height: 100%;
  padding: 15px;
  font-size: 1.1em;
  border: none;
  background: transparent linear-gradient(transparent, transparent 27px, rgba(139, 69, 19, 0.15) 28px);
  background-size: 100% 28px;
  color: #3e2a1e;
  resize: none;
  font-family: inherit;
  line-height: 1.8;
  z-index: 10;
  position: relative;
}

.page textarea::placeholder {
  color: rgba(62, 42, 30, 0.6);
  font-style: italic;
}

/* Book cover */
.book-cover {
  position: absolute;
  inset: -15px;
  background: linear-gradient(45deg, #8b4513, #a0522d);
  z-index: -2;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  transform: translateZ(-30px);
}

.cover-decoration {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, rgba(139, 69, 19, 0.2) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(139, 69, 19, 0.2) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(139, 69, 19, 0.2) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(139, 69, 19, 0.2) 75%);
  background-size: 60px 60px;
  border-radius: 15px;
  pointer-events: none;
}

.cover-border {
  position: absolute;
  inset: 10px;
  border: 3px double rgba(255, 233, 180, 0.3);
  border-radius: 10px;
  z-index: 1;
  pointer-events: none;
}

/* Metal corners */
.metal-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #a78e44, #ffd700, #a78e44);
  z-index: 2;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.metal-corner-tl {
  top: -5px;
  left: -5px;
  border-top-left-radius: 10px;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

.metal-corner-tr {
  top: -5px;
  right: -5px;
  border-top-right-radius: 10px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.metal-corner-bl {
  bottom: -5px;
  left: -5px;
  border-bottom-left-radius: 10px;
  box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.3);
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}

.metal-corner-br {
  bottom: -5px;
  right: -5px;
  border-bottom-right-radius: 10px;
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

/* Buttons */
.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
  gap: 20px;
}

button {
  background: linear-gradient(to bottom, #8b4513, #6b3510);
  width: 48%;
  color: #ffe9b4;
  border: 2px solid #6b3510;
  border-radius: 5px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  font-family: inherit;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  font-weight: bold;
}

button::before {
  content: "";
  position: absolute;
  inset: -2px;
  border: 1px solid rgba(255, 233, 180, 0.3);
  border-radius: 5px;
  pointer-events: none;
}

button:hover {
  background: linear-gradient(to bottom, #6b3510, #5a290d);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}
`;

export class NotebookComponent extends HTMLElement {
    private textareaLeft!: HTMLTextAreaElement;
    private textareaRight!: HTMLTextAreaElement;
    private saveButton!: HTMLButtonElement;
    private closeButton!: HTMLButtonElement;

    public connectedCallback(): void {
        this.attachShadow({ mode: "open" });
        this.render();
        this.loadNotes();
    }

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="book">
                <div class="spine"></div>
                <div class="book-cover">
                    <div class="leather-texture"></div>
                    <div class="cover-decoration"></div>
                    <div class="cover-border"></div>
                    <div class="metal-corner metal-corner-tl"></div>
                    <div class="metal-corner metal-corner-tr"></div>
                    <div class="metal-corner metal-corner-bl"></div>
                    <div class="metal-corner metal-corner-br"></div>
                </div>
                <div class="page">
                    <div class="page-corner page-corner-tl"></div>
                    <div class="page-corner page-corner-tr"></div>
                    <div class="page-corner page-corner-bl"></div>
                    <div class="page-corner page-corner-br"></div>
                    <textarea id="notepad-left" placeholder="Write your notes on the left page..."></textarea>
                </div>
                <div class="page">
                    <div class="page-corner page-corner-tl"></div>
                    <div class="page-corner page-corner-tr"></div>
                    <div class="page-corner page-corner-bl"></div>
                    <div class="page-corner page-corner-br"></div>
                    <textarea id="notepad-right" placeholder="Write your notes on the right page..."></textarea>
                </div>
            </div>
            <div class="buttons">
                <button id="save-btn">Save</button>
                <button id="close-btn">Close</button>
            </div>
        `;

        this.textareaLeft = this.shadowRoot.querySelector("#notepad-left")!;
        this.textareaRight = this.shadowRoot.querySelector("#notepad-right")!;
        this.saveButton = this.shadowRoot.querySelector("#save-btn")!;
        this.closeButton = this.shadowRoot.querySelector("#close-btn")!;

        this.saveButton.addEventListener("click", () => this.saveNotes());
        this.closeButton.addEventListener("click", () => {
            window.location.href = "";
        });
    }

    private saveNotes(): void {
        const textLeft: string = this.textareaLeft.value;
        const textRight: string = this.textareaRight.value;
        localStorage.setItem("playerNotesLeft", textLeft);
        localStorage.setItem("playerNotesRight", textRight);
    }

    private loadNotes(): void {
        const savedNotesLeft: string | null = localStorage.getItem("playerNotesLeft");
        const savedNotesRight: string | null = localStorage.getItem("playerNotesRight");
        if (savedNotesLeft) {
            this.textareaLeft.value = savedNotesLeft;
        }
        if (savedNotesRight) {
            this.textareaRight.value = savedNotesRight;
        }
    }
}
