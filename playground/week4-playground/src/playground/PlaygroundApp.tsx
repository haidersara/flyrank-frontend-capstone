import { useState } from "react";
import { Modal } from "./Modal";
import { Tabs, type TabItem } from "./Tabs";
import { Disclosure } from "./Disclosure";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import "./playground.css";

const tabItems: TabItem[] = [
  { id: "one", label: "Profile", content: <p>Profile panel content. Try Left/Right/Home/End here.</p> },
  { id: "two", label: "Settings", content: <p>Settings panel content.</p> },
  { id: "three", label: "Billing", content: <p>Billing panel content.</p> },
];

export function PlaygroundApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="playground-app">
      <h1>Week 4 · Playground</h1>

      <section>
        <h2>Modal</h2>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Open modal
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          titleId="demo-modal-title"
          title="Example modal"
        >
          <p>
            Tab and Shift+Tab should stay trapped inside this dialog. Escape closes it and
            returns focus to the "Open modal" button.
          </p>
          <input type="text" placeholder="A focusable field to test the trap" />
        </Modal>
      </section>

      <section>
        <h2>Tabs</h2>
        <Tabs items={tabItems} />
      </section>

      <section>
        <h2>Disclosure</h2>
        <Disclosure summary="What is this component?">
          <p>
            A disclosure widget hides or shows additional content on request, using a single
            toggle button with aria-expanded.
          </p>
        </Disclosure>
      </section>

      <section>
        <h2>shadcn/ui comparison</h2>

        <Dialog>
          <DialogTrigger asChild>
            <button type="button">Open shadcn modal</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>shadcn/ui dialog</DialogTitle>
            </DialogHeader>
            <p>Test the same keyboard behavior here: Tab trap, Escape, focus return.</p>
            <input type="text" placeholder="Focusable field" />
          </DialogContent>
        </Dialog>

        <ShadcnTabs defaultValue="one" className="shadcn-tabs-demo">
          <TabsList>
            <TabsTrigger value="one">Profile</TabsTrigger>
            <TabsTrigger value="two">Settings</TabsTrigger>
            <TabsTrigger value="three">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="one">shadcn profile panel.</TabsContent>
          <TabsContent value="two">shadcn settings panel.</TabsContent>
          <TabsContent value="three">shadcn billing panel.</TabsContent>
        </ShadcnTabs>
      </section>
    </main>
  );
}
