# My Notes end-to-end prototype

A single browser prototype combining the My Notes and Routine experience from `squarex1989/new_workflow`, Quick Brief from `squarex1989/quickbrief`, and the supplied Follow-ups redesign.

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates a static build in `dist/`.

## Journey

Use the top navigation to jump between Home, Note detail, In meeting, Templates, Apps, Tasks, Tags, and People. The ✨ icon at the top right opens Ask AI from every scene; Home has a workspace side panel, while Note detail has a meeting-aware side panel. The calendar also connects the flow: open the Acme Quick Brief, join the meeting, add a Live Assist card to the note, end the meeting, then review Follow-ups. In meeting, Note, Ask AI, and Live Assist have separate tabs. Templates restores the original six-template gallery and detail views. Apps contains the original Routine studio with its existing browsing, creation, and activity interactions.

In a note's Follow-ups tab, use **Need action**, **View result**, or a suggested task button to open a ZoomMate conversation in an iframe. The same conversation opens from **Run with AI** in Apps → Tasks. You can review a task-specific result, ask a follow-up, save it, and return to the task list.

Pins, completed tasks, and followed people persist in the browser. AI responses, saving, connector, sending, download, and external-source actions are simulated for this prototype.
