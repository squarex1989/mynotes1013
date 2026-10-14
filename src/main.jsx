import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  House,
  NotebookPen,
  Sparkles,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  Video,
  Settings,
  Search,
  Plus,
  Tag,
  Users,
  ListChecks,
  Zap,
  Pin,
  FileText,
  Mail,
  MessageSquare,
  ArrowRight,
  ArrowUp,
  X,
  Check,
  CircleAlert,
  Clock3,
  Link2,
  ExternalLink,
  Copy,
  MoreHorizontal,
  MicOff,
  VideoOff,
  ShieldCheck,
  Pause,
  Play,
  Bookmark,
  Globe2,
  SlidersHorizontal,
  CheckCircle2,
  Download,
  Share2,
  WandSparkles,
  BriefcaseBusiness,
  Paperclip,
  RotateCcw,
  LayoutTemplate,
} from "lucide-react";
import {
  meetings,
  briefItems,
  jordanBriefItems,
  noteCopy,
  followUps,
  taskGroups,
  tags,
  people,
} from "./data";
import "./styles.css";

const iconMap = { FileText, Mail, MessageSquare, ListChecks };
const connectorServices = [
  { name: "Google", initial: "G", description: "Including Google Calendar and Gmail", color: "#4285f4", background: "#f1f6ff" },
  { name: "Microsoft Outlook", initial: "O", color: "#287acb", background: "#eaf4ff" },
  { name: "Microsoft Teams", initial: "T", color: "#6459bd", background: "#f0efff" },
  { name: "Slack", initial: "S", color: "#559887", background: "#eff8f4" },
  { name: "Zoom Team Chat", initial: "Z", color: "#0b5cff", background: "#edf3ff" },
  { name: "Workvivo", initial: "W", color: "#6103ed", background: "#f3edff" },
  { name: "Salesforce", initial: "Sf", color: "#00a1e0", background: "#e9f9ff" },
  { name: "HubSpot", initial: "H", color: "#ff7a59", background: "#fff1ec" },
  { name: "Google Drive", initial: "D", color: "#34a853", background: "#edf8f0" },
  { name: "OneDrive", initial: "Od", color: "#0364b8", background: "#e9f3ff" },
  { name: "Notion", initial: "N", color: "#20242a", background: "#f1f2f3" },
  { name: "Jira", initial: "J", color: "#2684ff", background: "#eaf3ff" },
  { name: "Asana", initial: "A", color: "#e75b67", background: "#fff0f1" },
];
const initialPage = () => {
  const route = window.location.hash.replace("#/", "").split("/")[0] || "home";
  return route === "power" ? "apps" : route;
};
const avatars = (names) =>
  names.map((n, i) => (
    <span
      key={n}
      className={`avatar tone-${["blue", "purple", "green", "peach"][i % 4]}`}
      title={n}
    >
      {n
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)}
    </span>
  ));
function App() {
  const [page, setPage] = useState(initialPage);
  const [noteMode, setNoteMode] = useState("post");
  const [noteId, setNoteId] = useState("acme");
  const [noteTab, setNoteTab] = useState("Notes");
  const [liveTab, setLiveTab] = useState("Notes");
  const [powerOpen, setPowerOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("Connectors");
  const [briefOpen, setBriefOpen] = useState(true);
  const [liveBriefOpen, setLiveBriefOpen] = useState(true);
  const [toast, setToast] = useState("");
  const [source, setSource] = useState(null);
  const [pins, setPins] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("my-notes-pins")) || [];
    } catch {
      return [];
    }
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("my-notes-tasks")) || [];
    } catch {
      return [];
    }
  });
  const [follows, setFollows] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("my-notes-people")) ||
        people.followed.map((p) => p.id)
      );
    } catch {
      return people.followed.map((p) => p.id);
    }
  });
  const [connected, setConnected] = useState(["Google"]);
  const [quickBriefOn, setQuickBriefOn] = useState(true);
  const [taskFilter, setTaskFilter] = useState("All");
  const [peopleFilter, setPeopleFilter] = useState("All people");
  const [peoplePage, setPeoplePage] = useState(0);
  const [peopleInsight, setPeopleInsight] = useState(null);
  const [personPicker, setPersonPicker] = useState(false);
  const [personSearch, setPersonSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("customer");
  const [followStatus, setFollowStatus] = useState({});
  const [followExpanded, setFollowExpanded] = useState(null);
  const [taskAiStatus, setTaskAiStatus] = useState({});
  const [taskConversation, setTaskConversation] = useState(null);
  const [taskFrameExpanded, setTaskFrameExpanded] = useState(false);
  const [templatesEntryKey, setTemplatesEntryKey] = useState(0);
  const [aiOpen, setAiOpen] = useState(true);
  const [aiText, setAiText] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "I can help with this meeting. Ask a question or choose a suggestion.",
    },
  ]);
  const [homeAiOpen, setHomeAiOpen] = useState(true);
  const [homeAiText, setHomeAiText] = useState("");
  const [homeAiMessages, setHomeAiMessages] = useState([
    {
      role: "assistant",
      text: "Good afternoon, Xun. What would you like to know about your meetings and notes?",
    },
  ]);
  const [liveText, setLiveText] = useState("");
  const [liveMessages, setLiveMessages] = useState([
    {
      role: "assistant",
      text: "I can help with this meeting as it happens. What would you like to know?",
    },
  ]);
  const [liveNotes, setLiveNotes] = useState([
    "Ava confirmed a phased rollout is preferred.",
  ]);
  const [dismissedCards, setDismissedCards] = useState([]);
  const [liveStep, setLiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const f = () => setPage(initialPage());
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(
    () => localStorage.setItem("my-notes-pins", JSON.stringify(pins)),
    [pins],
  );
  useEffect(
    () =>
      localStorage.setItem("my-notes-tasks", JSON.stringify(completedTasks)),
    [completedTasks],
  );
  useEffect(
    () => localStorage.setItem("my-notes-people", JSON.stringify(follows)),
    [follows],
  );
  useEffect(() => {
    if (page !== "meeting" || !playing) return;
    const timer = setInterval(
      () => setLiveStep((v) => Math.min(v + 1, 3)),
      7200,
    );
    return () => clearInterval(timer);
  }, [page, playing]);
  useEffect(() => {
    const onTaskMessage = (event) => {
      if (
        event.origin !== window.location.origin ||
        event.data?.channel !== "my-notes-task-ai"
      )
        return;
      const { action, id, origin, message } = event.data;
      if (action === "close") setTaskConversation(null);
      if (action === "expand") setTaskFrameExpanded((value) => !value);
      if (action === "complete") {
        if (origin === "tasks")
          setTaskAiStatus((value) => ({ ...value, [id]: "completed" }));
        else setFollowStatus((value) => ({ ...value, [id]: "completed" }));
        setToast(message || "Result saved");
        window.setTimeout(() => setToast(""), 3000);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setTaskConversation(null);
    };
    window.addEventListener("message", onTaskMessage);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("message", onTaskMessage);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  const go = (dest) => {
    if (dest === "templates") setTemplatesEntryKey((value) => value + 1);
    window.location.hash = `/${dest}`;
    setPage(dest);
    document.querySelector(".workspace-scroll")?.scrollTo(0, 0);
  };
  const note = (id = "acme", tab = "Notes", mode = "post") => {
    setNoteId(id);
    setNoteTab(tab);
    setNoteMode(mode);
    go("note");
  };
  const showToast = (value) => {
    setToast(value);
    window.setTimeout(() => setToast(""), 3000);
  };
  const togglePin = (type, id, label) =>
    setPins((prev) =>
      prev.some((p) => p.type === type && p.id === id)
        ? prev.filter((p) => !(p.type === type && p.id === id))
        : [...prev, { type, id, label }],
    );
  const isPinned = (type, id) =>
    pins.some((p) => p.type === type && p.id === id);
  const openPin = (pin) => {
    if (pin.type === "tag") {
      setSelectedTag(pin.id);
      go("tag");
    } else if (pin.type === "task") {
      go("tasks");
      setTaskFilter("All");
    } else if (pin.type === "people") {
      go("people");
      setPeopleInsight(pin.id);
    }
  };
  const toggleTask = (id) =>
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  const openTaskConversation = (item, options = {}) => {
    setTaskFrameExpanded(false);
    setTaskConversation({
      id: item.id,
      title: item.title,
      detail: item.detail || "",
      state: options.state || item.state || "suggested",
      meeting: options.meeting || currentMeeting.title,
      origin: options.origin || "note",
      owner: item.owner || "",
      due: item.due || "",
      source: item.source || "",
    });
  };
  const ask = (text, kind = "note") => {
    const q = text.trim();
    if (!q) return;
    const answer = q.toLowerCase().includes("action")
      ? "Three next steps: confirm the rollout sequence, provide SSO sandbox access, and share revised pricing."
      : q.toLowerCase().includes("summary") || q.toLowerCase().includes("catch")
        ? "Acme prefers a phased rollout. Pricing and sandbox access remain the two open items."
        : "The relevant meeting context points to the phased rollout, revised pricing, and SSO sandbox access. You can add this to the note or open the cited source.";
    if (kind === "live") {
      setLiveMessages((m) => [
        ...m,
        { role: "user", text: q },
        { role: "assistant", text: answer },
      ]);
      setLiveText("");
      setLiveTab("Ask AI");
    } else {
      setAiMessages((m) => [
        ...m,
        { role: "user", text: q },
        { role: "assistant", text: answer },
      ]);
      setAiText("");
      setAiOpen(true);
    }
  };
  const askHome = (text) => {
    const q = text.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    const answer = lower.includes("task") || lower.includes("action") || lower.includes("focus") || lower.includes("attention")
      ? "You have 3 next steps from the Acme QBR: confirm the rollout sequence with Ava, provide SSO sandbox access, and share revised pricing before Thursday."
      : lower.includes("meeting") || lower.includes("calendar") || lower.includes("prepare")
        ? "Your Acme Corp QBR is at 2:00 PM. Ava’s team is reviewing phased-seat pricing; SSO sandbox access and EU data residency are still open."
        : lower.includes("note") || lower.includes("recent")
          ? "Your recent notes include the Acme QBR, Product Leadership Sync, Jordan’s 1:1, and Design critique. The Acme note has a Quick brief and follow-ups ready."
          : "Across your notes, the most active themes are Acme’s phased rollout, Enterprise pricing, and SSO validation. Ask me about a meeting, person, or next step.";
    setHomeAiMessages((messages) => [
      ...messages,
      { role: "user", text: q },
      { role: "assistant", text: answer },
    ]);
    setHomeAiText("");
    setHomeAiOpen(true);
  };
  const navItems = [
    ["home", "Home", House],
    ["notes", "All notes", NotebookPen],
    ["templates", "Templates", LayoutTemplate],
  ];
  const powerItems = [
    ["routines", "Routine", Zap],
    ["tasks", "Tasks", ListChecks],
    ["tags", "Tags", Tag],
    ["people", "People", Users],
  ];
  const currentMeeting = meetings.find((m) => m.id === noteId) || meetings[0];
  const currentCopy = noteCopy[currentMeeting.id] || noteCopy.acme;
  const currentBrief =
    currentMeeting.id === "jordan" ? jordanBriefItems : briefItems;
  const currentFollowUps =
    currentMeeting.id === "acme"
      ? followUps
      : (taskGroups.find((g) => g.id === currentMeeting.id)?.items || []).map(
          (t) => ({
            id: t.id,
            title: t.title,
            kind: "Suggested",
            state: "suggested",
            detail: `${t.owner} · due ${t.due}`,
            icon: "ListChecks",
          }),
        );
  const allPeople = [
    ...people.followed,
    ...people.recommended.map((p) => ({
      ...p,
      email: `${p.name.toLowerCase().replace(" ", ".")}@zoom.us`,
      type: "Internal",
      insight: `Recent meetings with ${p.name} are ready to explore.`,
    })),
  ];
  const filteredPeople = allPeople.filter(
    (p) =>
      follows.includes(p.id) &&
      (peopleFilter === "All people" || peopleFilter === p.type),
  );
  const activeTag = tags.find((t) => t.id === selectedTag) || tags[0];
  return (
    <div className="app">
      <header className="scenario-bar">
        <nav aria-label="Prototype scenes">
          {[
            ["home", "Home · Calendar"],
            ["note", "Note detail"],
            ["meeting", "In meeting"],
            ["templates", "Templates"],
            ["apps", "Apps"],
            ["tasks", "Tasks"],
            ["tags", "Tags"],
            ["people", "People"],
            ["connectors", "Connectors"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={
                (settingsOpen && settingsTab === "Connectors"
                  ? key === "connectors"
                  : page === key)
                  ? "selected"
                  : ""
              }
              aria-haspopup={key === "connectors" ? "dialog" : undefined}
              aria-expanded={key === "connectors" ? settingsOpen && settingsTab === "Connectors" : undefined}
              onClick={() => {
                if (key === "connectors") {
                  setSettingsTab("Connectors");
                  setSettingsOpen(true);
                } else if (key === "note") {
                  note("acme", "Notes", "post");
                } else {
                  go(key);
                }
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="scenario-end">
          <span className="prototype-chip">Prototype</span>
        </div>
      </header>
      <div className="shell">
        <aside className="sidebar">
          <div className="side-header">
            <span className="side-logo">
              <NotebookPen size={19} />
            </span>
            <strong>My Notes</strong>
            <button
              className="icon-btn side-add"
              onClick={() => note("acme")}
              aria-label="New note"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="side-search">
            <Search size={17} />
            <input
              placeholder="Search notes, tags, people"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  showToast(`Search results for “${e.currentTarget.value}”`);
                  e.currentTarget.blur();
                }
              }}
            />
            <span>⌘ K</span>
          </div>
          <div className="side-nav">
            {navItems.map(([id, label, Icon]) => (
              <button
                key={id}
                className={page === id ? "active" : ""}
                onClick={() => go(id)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
            <button
              className={
                [
                  "apps",
                  "routines",
                  "tasks",
                  "tags",
                  "tag",
                  "people",
                ].includes(page)
                  ? "active"
                  : ""
              }
              onClick={() => {
                setPowerOpen(!powerOpen);
                go("apps");
              }}
            >
              <Sparkles size={18} />
              <span>Apps</span>
              <ChevronDown
                size={15}
                className={`nav-chevron ${powerOpen ? "open" : ""}`}
              />
            </button>
            {powerOpen && (
              <div className="sub-nav">
                {powerItems.map(([id, label, Icon]) => (
                  <button
                    key={id}
                    className={
                      page === id || (id === "tags" && page === "tag")
                        ? "active"
                        : ""
                    }
                    onClick={() => go(id)}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                    {id === "tasks" && <em>3</em>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="pins">
            <div className="pins-heading">
              <span>
                <Pin size={14} /> Pins
              </span>
              <span>{pins.length}</span>
            </div>
            {pins.length ? (
              <div className="pin-list">
                {pins.map((p) => (
                  <button key={`${p.type}-${p.id}`} onClick={() => openPin(p)}>
                    <span className="pin-type">
                      {p.type === "tag" ? (
                        <Tag size={14} />
                      ) : p.type === "task" ? (
                        <ListChecks size={14} />
                      ) : (
                        <Users size={14} />
                      )}
                    </span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="pins-empty">
                Pinned tags, people, and tasks appear here.
              </div>
            )}
          </div>
          <div className="side-footer">
            <button
              onClick={() => {
                setSettingsTab("Connectors");
                setSettingsOpen(true);
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <div className="profile">
              <span className="avatar tone-blue">XX</span>
              <span>
                <strong>Xun Xiao</strong>
                <small>My Notes Pro</small>
              </span>
              <MoreHorizontal size={17} />
            </div>
          </div>
        </aside>
        <main
          className={`workspace ${page === "meeting" ? "meeting-workspace" : ""}`}
        >
          {["routines", "templates"].includes(page) ? (
            <div className="routine-shell">
              <iframe
                key={page === "templates" ? `templates-${templatesEntryKey}` : "routines"}
                title={page === "templates" ? "Templates" : "Routine studio"}
                src={`/routine-studio/My%20Notes%20-%20Skills.dc.html${page === "templates" ? "?view=templates" : ""}`}
              />
            </div>
          ) : (
            <div className="workspace-scroll">
              {page === "home" && (
                <div className="home-layout">
                  <div className="content home-page">
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">Tuesday, October 13</p>
                      <h1>Good afternoon, Xun</h1>
                      <p className="subtext">
                        You have a meeting coming up and a few things ready for
                        review.
                      </p>
                    </div>
                    <div className="home-heading-actions">
                      {!homeAiOpen && (
                        <button className="soft-btn" onClick={() => setHomeAiOpen(true)}>
                          <Sparkles size={16} /> Ask AI
                        </button>
                      )}
                      <button className="soft-btn" onClick={() => go("tasks")}>
                        <ListChecks size={16} /> View tasks
                      </button>
                    </div>
                  </div>
                  <section className="home-tips">
                    <div className="tips-icon">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <strong>While you were away</strong>
                      <p>
                        2 follow-ups are ready, and one routine needs your
                        review.
                      </p>
                    </div>
                    <button onClick={() => go("apps")}>
                      Open Apps <ArrowRight size={15} />
                    </button>
                  </section>
                  <div className="section-heading">
                    <div>
                      <h2>Calendar</h2>
                      <p>Tuesday, October 13</p>
                    </div>
                    <div className="calendar-switch">
                      <button className="active">Day</button>
                      <button onClick={() => showToast("Week view selected")}>
                        Week
                      </button>
                    </div>
                  </div>
                  <div className="calendar-layout">
                    <div className="date-rail">
                      <strong>13</strong>
                      <span>Tue</span>
                      <div className="date-dot" />
                    </div>
                    <div className="calendar-events">
                      <div className="time-line">
                        <span>11 AM</span>
                        <span>2 PM</span>
                        <span>4 PM</span>
                      </div>
                      {[meetings[1], meetings[0]].map((m, i) => (
                        <button
                          key={m.id}
                          className={`calendar-event event-${i}`}
                          onClick={() =>
                            note(
                              m.id,
                              "Notes",
                              m.id === "acme" ? "before" : "post",
                            )
                          }
                        >
                          <span className="event-time">
                            {i === 0
                              ? "11:00 – 11:45"
                              : i === 1
                                ? "14:00 – 15:00"
                                : "16:30 – 17:00"}
                          </span>
                          <strong>{m.title}</strong>
                          <span className="event-meta">
                            <Video size={13} /> Zoom Meeting{" "}
                            {m.brief && quickBriefOn && (
                              <span className="brief-pill">
                                <Sparkles size={12} /> Quick brief ready
                              </span>
                            )}
                          </span>
                          {m.id === "acme" && (
                            <span
                              className="event-actions"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span
                                onClick={() => note("acme", "Notes", "before")}
                              >
                                Open brief
                              </span>
                              <span
                                onClick={() => {
                                  setLiveStep(0);
                                  go("meeting");
                                }}
                              >
                                Join meeting
                              </span>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="section-heading notes-heading">
                    <div>
                      <h2>Recent notes</h2>
                      <p>Pick up where you left off</p>
                    </div>
                    <button className="text-btn" onClick={() => go("notes")}>
                      See all <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="note-list">
                    {meetings.map((m) => (
                      <button
                        key={m.id}
                        className="note-row"
                        onClick={() => note(m.id)}
                      >
                        <span className="note-icon">
                          <NotebookPen size={17} />
                        </span>
                        <span className="note-row-copy">
                          <strong>{m.title}</strong>
                          <small>
                            {m.time} · Hosted by {m.host}
                          </small>
                        </span>
                        {m.brief && quickBriefOn && (
                          <span className="mini-label">
                            <Sparkles size={12} /> Quick brief
                          </span>
                        )}
                        <ChevronRight size={17} />
                      </button>
                    ))}
                  </div>
                  </div>
                  {homeAiOpen && (
                    <aside className="note-assistant home-assistant" aria-label="Ask AI">
                      <div className="assistant-head">
                        <span className="assistant-spark"><Sparkles size={18} /></span>
                        <div>
                          <strong>Ask AI</strong>
                          <small>Across your workspace</small>
                        </div>
                        <button className="icon-btn" onClick={() => setHomeAiOpen(false)} aria-label="Close Ask AI">
                          <X size={17} />
                        </button>
                      </div>
                      <div className="assistant-messages" aria-live="polite">
                        {homeAiMessages.map((message, index) => (
                          <div className={`ai-message ${message.role}`} key={index}>
                            {message.role === "assistant" && (
                              <span className="assistant-spark tiny"><Sparkles size={13} /></span>
                            )}
                            <p>{message.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="assistant-composer">
                        <div className="prompt-chips">
                          {["What needs my attention?", "Prepare for my next meeting", "Find action items"].map((prompt) => (
                            <button key={prompt} onClick={() => askHome(prompt)}>{prompt}</button>
                          ))}
                        </div>
                        <form onSubmit={(event) => { event.preventDefault(); askHome(homeAiText); }}>
                          <input value={homeAiText} onChange={(event) => setHomeAiText(event.target.value)} placeholder="Ask across your meetings…" aria-label="Ask AI across your workspace" />
                          <button type="submit" aria-label="Send to Ask AI"><ArrowUp size={18} /></button>
                        </form>
                      </div>
                    </aside>
                  )}
                </div>
              )}
              {page === "notes" && (
                <div className="content list-page">
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">MY NOTES</p>
                      <h1>All notes</h1>
                      <p className="subtext">
                        Meetings, decisions, and next steps in one place.
                      </p>
                    </div>
                    <button
                      className="primary-btn"
                      onClick={() => note("acme")}
                    >
                      <Plus size={16} /> New note
                    </button>
                  </div>
                  <div className="list-toolbar">
                    <button className="tab-lite active">All notes</button>
                    <button
                      className="tab-lite"
                      onClick={() => showToast("Showing notes shared with you")}
                    >
                      Shared with me
                    </button>
                    <span className="toolbar-spacer" />
                    <button className="soft-btn">
                      <SlidersHorizontal size={15} /> Filter
                    </button>
                  </div>
                  <div className="note-list large">
                    {meetings.map((m) => (
                      <button
                        key={m.id}
                        className="note-row"
                        onClick={() => note(m.id)}
                      >
                        <span className="note-icon">
                          <NotebookPen size={17} />
                        </span>
                        <span className="note-row-copy">
                          <strong>{m.title}</strong>
                          <small>
                            {m.time} · Hosted by {m.host}
                          </small>
                        </span>
                        <span className="tag-inline">
                          <Tag size={13} />
                          {m.tag}
                        </span>
                        <ChevronRight size={17} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {page === "apps" && (
                <div className="content power-page">
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">MY NOTES</p>
                      <h1>Apps</h1>
                      <p className="subtext">
                        Keep work moving after the meeting.
                      </p>
                    </div>
                  </div>
                  <section className="power-banner">
                    <div className="power-banner-icon">
                      <Sparkles size={25} />
                    </div>
                    <div>
                      <span className="eyebrow">TODAY</span>
                      <h2>There’s new momentum in your notes</h2>
                      <p>
                        Your routines, tasks, tags, and people have updates
                        worth a look.
                      </p>
                    </div>
                  </section>
                  <div className="power-grid">
                    <button
                      className="power-feature"
                      onClick={() => go("routines")}
                    >
                      <span className="feature-icon blue">
                        <Zap size={20} />
                      </span>
                      <span className="feature-copy">
                        <small>ROUTINE</small>
                        <strong>One routine needs your review</strong>
                        <span>
                          The Acme QBR summary is waiting for Google access.
                        </span>
                        <b>
                          Review routine <ArrowRight size={15} />
                        </b>
                      </span>
                    </button>
                    <button
                      className="power-feature"
                      onClick={() => go("tasks")}
                    >
                      <span className="feature-icon green">
                        <ListChecks size={20} />
                      </span>
                      <span className="feature-copy">
                        <small>TASKS</small>
                        <strong>3 new tasks from Acme QBR</strong>
                        <span>
                          Rollout, sandbox access, and revised pricing have
                          owners.
                        </span>
                        <b>
                          Review tasks <ArrowRight size={15} />
                        </b>
                      </span>
                    </button>
                    <button
                      className="power-feature"
                      onClick={() => {
                        setSelectedTag("customer");
                        go("tag");
                      }}
                    >
                      <span className="feature-icon purple">
                        <Tag size={20} />
                      </span>
                      <span className="feature-copy">
                        <small>TAGS</small>
                        <strong>Customer meetings changed</strong>
                        <span>
                          Pricing and sandbox access are now the open themes.
                        </span>
                        <b>
                          See insight <ArrowRight size={15} />
                        </b>
                      </span>
                    </button>
                    <button
                      className="power-feature"
                      onClick={() => go("people")}
                    >
                      <span className="feature-icon amber">
                        <Users size={20} />
                      </span>
                      <span className="feature-copy">
                        <small>PEOPLE</small>
                        <strong>Ava is waiting on the plan</strong>
                        <span>
                          A follow-up could close the rollout sequence today.
                        </span>
                        <b>
                          View people <ArrowRight size={15} />
                        </b>
                      </span>
                    </button>
                  </div>
                  <div className="section-heading power-bottom">
                    <div>
                      <h2>Your routines</h2>
                      <p>Recent activity from connected meetings</p>
                    </div>
                    <button className="text-btn" onClick={() => go("routines")}>
                      Browse all <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="activity-line">
                    <span className="activity-icon">
                      <CheckCircle2 size={17} />
                    </span>
                    <div>
                      <strong>Email recaps to participants</strong>
                      <small>
                        Ran after Product Leadership Sync · 11:46 AM
                      </small>
                    </div>
                    <span className="status good">Completed</span>
                  </div>
                  <div className="activity-line">
                    <span className="activity-icon warning">
                      <CircleAlert size={17} />
                    </span>
                    <div>
                      <strong>Save meeting summary to Google Docs</strong>
                      <small>Acme Corp QBR · Needs account access</small>
                    </div>
                    <button
                      className="small-btn"
                      onClick={() => note("acme", "Follow-ups")}
                    >
                      Review
                    </button>
                  </div>
                </div>
              )}
              {page === "note" && (
                <div className="note-layout">
                  <div className="note-main">
                    <div className="note-top">
                      <button className="back-link" onClick={() => go("notes")}>
                        <ChevronRight size={16} /> All notes
                      </button>
                      <div>
                        {noteMode === "before" &&
                          currentMeeting.id === "acme" && (
                            <button
                              className="primary-btn small"
                              onClick={() => {
                                setLiveStep(0);
                                go("meeting");
                              }}
                            >
                              <Video size={15} /> Join meeting
                            </button>
                          )}
                        <button
                          className="primary-btn small"
                          onClick={() => showToast("Sharing options opened")}
                        >
                          <Share2 size={15} /> Share
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() => showToast("Note link copied")}
                          aria-label="Copy link"
                        >
                          <Link2 size={18} />
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() => setAiOpen(!aiOpen)}
                          aria-label="Toggle note assistant"
                        >
                          <Sparkles size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="note-document">
                      <p className="eyebrow">
                        {noteMode === "before"
                          ? "UPCOMING MEETING"
                          : "MEETING NOTE"}
                      </p>
                      <h1>{currentMeeting.title}</h1>
                      <div className="note-meta">
                        <span>
                          <CalendarDays size={16} />
                          {currentMeeting.date} ·{" "}
                          {currentMeeting.time.split(", ").slice(-1)[0]}
                        </span>
                        <span>
                          <Users size={16} />
                          {currentMeeting.people}
                        </span>
                      </div>
                      <div className="note-properties">
                        <span
                          className="tag-inline clickable"
                          onClick={() => {
                            setSelectedTag(
                              currentMeeting.tag === "Customer meetings"
                                ? "customer"
                                : "product",
                            );
                            go("tag");
                          }}
                        >
                          <Tag size={14} />
                          {currentMeeting.tag}
                        </span>
                        {currentMeeting.brief && quickBriefOn && (
                          <button
                            className="brief-trigger"
                            onClick={() => setBriefOpen(!briefOpen)}
                            aria-expanded={briefOpen}
                          >
                            <Sparkles size={14} /> Quick brief{" "}
                            <ChevronDown
                              size={14}
                              className={briefOpen ? "rotate" : ""}
                            />
                          </button>
                        )}
                      </div>
                      {currentMeeting.brief && quickBriefOn && briefOpen && (
                        <Brief items={currentBrief} onSource={setSource} />
                      )}
                      <div className="note-tabs">
                        {["Notes", "Transcript", "Follow-ups"].map((t) => (
                          <button
                            key={t}
                            className={noteTab === t ? "active" : ""}
                            onClick={() => setNoteTab(t)}
                          >
                            {t === "Notes" ? (
                              <NotebookPen size={16} />
                            ) : t === "Transcript" ? (
                              <FileText size={16} />
                            ) : (
                              <ListChecks size={16} />
                            )}{" "}
                            {t}
                          </button>
                        ))}
                      </div>
                      {noteTab === "Notes" &&
                        (noteMode === "before" ? (
                          <div className="before-note">
                            <NotebookPen size={23} />
                            <h2>Private note</h2>
                            <p>
                              Add thoughts before your meeting. They’ll stay
                              with this note.
                            </p>
                            <div
                              contentEditable
                              suppressContentEditableWarning
                              data-placeholder="Write a note…"
                            />
                          </div>
                        ) : (
                          <div className="note-body">
                            <div className="note-body-toolbar">
                              <strong>Meeting notes</strong>
                              <span>Private</span>
                            </div>
                            <h2>Key outcomes</h2>
                            <p>{currentCopy.outcome}</p>
                            <h2>Decisions</h2>
                            <ul>
                              {currentCopy.decisions.map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                            <h2>Open questions</h2>
                            <ul>
                              {currentCopy.questions.map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                            {currentMeeting.id === "acme" &&
                              liveNotes.length > 0 && (
                                <>
                                  <h2>Private notes</h2>
                                  <ul>
                                    {liveNotes.map((x, i) => (
                                      <li key={i}>{x}</li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            <div
                              className="note-edit"
                              contentEditable
                              suppressContentEditableWarning
                              data-placeholder="Add your notes…"
                            />
                          </div>
                        ))}
                      {noteTab === "Transcript" && (
                        <div className="transcript">
                          <div className="transcript-toolbar">
                            <strong>Transcript</strong>
                            <button
                              className="soft-btn"
                              onClick={() => showToast("Transcript downloaded")}
                            >
                              <Download size={15} /> Download
                            </button>
                          </div>
                          {[
                            [
                              "Ava Brooks",
                              "We have one question about the rollout sequence. Customer Success can go first, but Sales will need another week.",
                              "14:08",
                            ],
                            [
                              "Xun Xiao",
                              "That works. We can prepare the sandbox for SSO validation in parallel.",
                              "14:23",
                            ],
                            [
                              "Jordan Lee",
                              "I’ll make sure the sandbox is ready by tomorrow.",
                              "14:37",
                            ],
                            [
                              "Ava Brooks",
                              "Please send the revised pricing before Thursday’s procurement review.",
                              "14:49",
                            ],
                          ].map(([name, line, time]) => (
                            <div className="transcript-line" key={time}>
                              <span className="avatar tone-purple">
                                {name
                                  .split(" ")
                                  .map((p) => p[0])
                                  .join("")}
                              </span>
                              <div>
                                <strong>{name}</strong>
                                <small>{time}</small>
                                <p>{line}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {noteTab === "Follow-ups" && (
                        <FollowupBoard
                          items={currentFollowUps}
                          followStatus={followStatus}
                          expanded={followExpanded}
                          setExpanded={setFollowExpanded}
                          openConversation={openTaskConversation}
                          meeting={currentMeeting.title}
                        />
                      )}
                    </div>
                  </div>
                  {aiOpen && (
                    <aside className="note-assistant">
                      <div className="assistant-head">
                        <span className="assistant-spark">
                          <Sparkles size={18} />
                        </span>
                        <div>
                          <strong>Note assistant</strong>
                          <small>This meeting</small>
                        </div>
                        <button
                          className="icon-btn"
                          onClick={() => setAiOpen(false)}
                          aria-label="Close assistant"
                        >
                          <X size={17} />
                        </button>
                      </div>
                      <div className="assistant-messages">
                        {aiMessages.map((m, i) => (
                          <div key={i} className={`ai-message ${m.role}`}>
                            {m.role === "assistant" && (
                              <span className="assistant-spark tiny">
                                <Sparkles size={13} />
                              </span>
                            )}
                            <p>{m.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="assistant-composer">
                        <div className="prompt-chips">
                          {[
                            "Catch me up",
                            "List action items",
                            "Summarize viewpoints",
                          ].map((x) => (
                            <button key={x} onClick={() => ask(x)}>
                              {x}
                            </button>
                          ))}
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            ask(aiText);
                          }}
                        >
                          <input
                            value={aiText}
                            onChange={(e) => setAiText(e.target.value)}
                            placeholder="Ask about this meeting…"
                          />
                          <button type="submit" aria-label="Send">
                            <ArrowUp size={18} />
                          </button>
                        </form>
                      </div>
                    </aside>
                  )}
                </div>
              )}
              {page === "tasks" && (
                <div className="content tasks-page">
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">APPS</p>
                      <h1>Tasks</h1>
                      <p className="subtext">
                        Recommended next steps from your meetings.
                      </p>
                    </div>
                    <button
                      className="soft-btn"
                      onClick={() => showToast("Tasks are up to date")}
                    >
                      <RotateCcw size={15} /> Refresh
                    </button>
                  </div>
                  <div className="filter-row">
                    {["All", "Recommended", "Completed"].map((f) => (
                      <button
                        key={f}
                        className={taskFilter === f ? "active" : ""}
                        onClick={() => setTaskFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="task-groups">
                    {taskGroups.map((g) => {
                      const visible = g.items.filter(
                        (t) =>
                          taskFilter === "All" ||
                          (taskFilter === "Completed"
                            ? completedTasks.includes(t.id)
                            : !completedTasks.includes(t.id)),
                      );
                      if (!visible.length) return null;
                      return (
                        <section className="task-group" key={g.id}>
                          <div className="task-group-head">
                            <div>
                              <span className="meeting-avatar">
                                <Video size={17} />
                              </span>
                              <div>
                                <h2>{g.meeting}</h2>
                                <p>
                                  {g.date} · {visible.length}{" "}
                                  {visible.length === 1 ? "task" : "tasks"}
                                </p>
                              </div>
                            </div>
                            <button
                              className="text-btn"
                              onClick={() => note(g.id, "Follow-ups")}
                            >
                              Open meeting <ArrowRight size={14} />
                            </button>
                          </div>
                          <div className="task-list">
                            {visible.map((t) => (
                              <div className="task-row" key={t.id}>
                                <button
                                  className={`task-check ${completedTasks.includes(t.id) ? "checked" : ""}`}
                                  onClick={() => toggleTask(t.id)}
                                  aria-label={`Complete ${t.title}`}
                                >
                                  {completedTasks.includes(t.id) && (
                                    <Check size={14} />
                                  )}
                                </button>
                                <div className="task-copy">
                                  <strong
                                    className={
                                      completedTasks.includes(t.id)
                                        ? "done"
                                        : ""
                                    }
                                  >
                                    {t.title}
                                  </strong>
                                  <span>{t.source}</span>
                                </div>
                                <div className="task-owner">
                                  <span className="avatar tone-blue">
                                    {t.owner === "You"
                                      ? "XX"
                                      : t.owner
                                          .split(" ")
                                          .map((p) => p[0])
                                          .join("")}
                                  </span>
                                  {t.owner}
                                </div>
                                <span className="task-due">
                                  <Clock3 size={14} />
                                  {t.due}
                                </span>
                                <button
                                  className="task-ai-action"
                                  onClick={() =>
                                    openTaskConversation(t, {
                                      meeting: g.meeting,
                                      origin: "tasks",
                                      state: taskAiStatus[t.id] || "suggested",
                                    })
                                  }
                                >
                                  {taskAiStatus[t.id] === "completed" ? (
                                    <><CheckCircle2 size={14} /> View result</>
                                  ) : (
                                    <><Sparkles size={14} /> Run with AI</>
                                  )}
                                </button>
                                <button
                                  className={`icon-btn pin-button ${isPinned("task", t.id) ? "pinned" : ""}`}
                                  onClick={() =>
                                    togglePin("task", t.id, t.title)
                                  }
                                  aria-label="Pin task"
                                >
                                  <Pin size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              )}
              {page === "tags" && (
                <div className="content tags-page">
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">APPS</p>
                      <h1>Tags</h1>
                      <p className="subtext">
                        Follow the themes and projects in your notes.
                      </p>
                    </div>
                    <button
                      className="primary-btn"
                      onClick={() => showToast("New tag created")}
                    >
                      <Plus size={16} /> New tag
                    </button>
                  </div>
                  <section
                    className="tag-highlight"
                    onClick={() => {
                      setSelectedTag("customer");
                      go("tag");
                    }}
                  >
                    <span className="feature-icon purple">
                      <Sparkles size={20} />
                    </span>
                    <div>
                      <small>NEW INSIGHT · CUSTOMER MEETINGS</small>
                      <strong>
                        Acme’s rollout now depends on sandbox access and revised
                        pricing.
                      </strong>
                      <span>
                        See the meetings and next steps behind this change.
                      </span>
                    </div>
                    <ArrowRight size={18} />
                  </section>
                  <div className="section-heading">
                    <div>
                      <h2>All tags</h2>
                      <p>Grouped by project and meeting theme</p>
                    </div>
                  </div>
                  <div className="tag-grid">
                    {tags.map((t) => (
                      <div key={t.id} className="tag-card">
                        <button
                          className="tag-card-main"
                          onClick={() => {
                            setSelectedTag(t.id);
                            go("tag");
                          }}
                        >
                          <span className={`tag-mark ${t.color}`}>
                            <Tag size={17} />
                          </span>
                          <strong>{t.name}</strong>
                          <small>
                            {t.count} notes · {t.updated}
                          </small>
                          <span className="tag-insight">
                            <Sparkles size={14} />
                            {t.insight}
                          </span>
                        </button>
                        <button
                          className={`icon-btn pin-button ${isPinned("tag", t.id) ? "pinned" : ""}`}
                          onClick={() => togglePin("tag", t.id, t.name)}
                          aria-label={`Pin ${t.name}`}
                        >
                          <Pin size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {page === "tag" && (
                <div className="content tag-detail">
                  <button className="back-link" onClick={() => go("tags")}>
                    <ChevronRight size={16} /> Tags
                  </button>
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">APPS / TAGS</p>
                      <h1>{activeTag.name}</h1>
                      <p className="subtext">
                        {activeTag.count} notes · Private · {activeTag.updated}
                      </p>
                    </div>
                    <button
                      className={`soft-btn ${isPinned("tag", activeTag.id) ? "pinned" : ""}`}
                      onClick={() =>
                        togglePin("tag", activeTag.id, activeTag.name)
                      }
                    >
                      <Pin size={15} />
                      {isPinned("tag", activeTag.id) ? "Pinned" : "Pin tag"}
                    </button>
                  </div>
                  <section className="tag-detail-insight">
                    <div className="insight-heading">
                      <span className="feature-icon purple">
                        <Sparkles size={20} />
                      </span>
                      <span>Latest insight</span>
                    </div>
                    <h2>{activeTag.insight}</h2>
                    <p>
                      {activeTag.id === "customer"
                        ? "Ava confirmed the rollout phases, while procurement needs updated pricing and the SSO sandbox remains pending."
                        : "Recent notes show this theme needs a clear owner and next step."}
                    </p>
                    <div>
                      <button
                        className="primary-btn"
                        onClick={() =>
                          activeTag.id === "customer"
                            ? note("acme", "Follow-ups")
                            : go("tasks")
                        }
                      >
                        {activeTag.action}
                        <ArrowRight size={15} />
                      </button>
                      <button
                        className="soft-btn"
                        onClick={() => showToast("Insight saved")}
                      >
                        Save insight
                      </button>
                    </div>
                  </section>
                  <div className="tag-detail-columns">
                    <section>
                      <div className="section-heading">
                        <div>
                          <h2>Notes</h2>
                          <p>Recent conversations in this tag</p>
                        </div>
                      </div>
                      <div className="note-list">
                        {meetings
                          .filter((m) =>
                            activeTag.id === "customer"
                              ? m.id === "acme"
                              : activeTag.id === "product"
                                ? m.id === "product"
                                : activeTag.id === "one"
                                  ? m.id === "jordan"
                                  : true,
                          )
                          .map((m) => (
                            <button
                              className="note-row"
                              key={m.id}
                              onClick={() => note(m.id)}
                            >
                              <span className="note-icon">
                                <NotebookPen size={17} />
                              </span>
                              <span className="note-row-copy">
                                <strong>{m.title}</strong>
                                <small>{m.time}</small>
                              </span>
                              <ChevronRight size={17} />
                            </button>
                          ))}
                      </div>
                    </section>
                    <section>
                      <div className="section-heading">
                        <div>
                          <h2>Open next steps</h2>
                          <p>From notes in this tag</p>
                        </div>
                      </div>
                      <div className="mini-tasks">
                        {taskGroups[activeTag.id === "customer" ? 0 : 1].items
                          .slice(0, 3)
                          .map((t) => (
                            <button key={t.id} onClick={() => go("tasks")}>
                              <ListChecks size={16} />
                              <span>{t.title}</span>
                              <ChevronRight size={15} />
                            </button>
                          ))}
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {page === "people" && (
                <div className="content people-page">
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">APPS</p>
                      <h1>People</h1>
                    </div>
                  </div>
                  <div className="section-heading people-heading">
                    <div>
                      <h2>Recommended</h2>
                    </div>
                    <div className="carousel-buttons">
                      <button
                        onClick={() =>
                          setPeoplePage(Math.max(0, peoplePage - 1))
                        }
                        aria-label="Previous recommendations"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setPeoplePage(Math.min(1, peoplePage + 1))
                        }
                        aria-label="Next recommendations"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="recommend-grid">
                    {people.recommended
                      .slice(peoplePage, peoplePage + 4)
                      .map((p) => (
                        <div className="recommend-card" key={p.id}>
                          <span className={`avatar large tone-${p.tone}`}>
                            {p.initials}
                          </span>
                          <strong>{p.name}</strong>
                          <span>{p.role}</span>
                          <button
                            onClick={() => {
                              setFollows((prev) =>
                                prev.includes(p.id) ? prev : [...prev, p.id],
                              );
                              showToast(`Following ${p.name}`);
                            }}
                          >
                            {follows.includes(p.id) ? "Following" : "Follow"}
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="section-heading followed-heading">
                    <div>
                      <h2>Followed</h2>
                    </div>
                    <button
                      className="primary-btn"
                      onClick={() => setPersonPicker(true)}
                    >
                      <Plus size={17} /> Follow a person
                    </button>
                  </div>
                  <div className="filter-row segmented">
                    {["All people", "External", "Internal"].map((f) => (
                      <button
                        key={f}
                        className={peopleFilter === f ? "active" : ""}
                        onClick={() => setPeopleFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="people-grid">
                    {filteredPeople.map((p) => (
                      <div className="person-card" key={p.id}>
                        <div className="person-main">
                          <span className={`avatar large tone-${p.tone}`}>
                            {p.initials}
                          </span>
                          <div>
                            <strong>
                              {p.name} <small>{p.type}</small>
                            </strong>
                            <p>{p.role}</p>
                            <span>{p.email}</span>
                          </div>
                          <button
                            className={`icon-btn pin-button ${isPinned("people", p.id) ? "pinned" : ""}`}
                            onClick={() => togglePin("people", p.id, p.name)}
                            aria-label={`Pin ${p.name}`}
                          >
                            <Pin size={16} />
                          </button>
                        </div>
                        <div className="person-actions">
                          <button
                            onClick={() => {
                              setPeopleInsight(p.id);
                              showToast(`Ask AI about ${p.name}`);
                            }}
                          >
                            <MessageSquare size={16} /> Ask AI about{" "}
                            {p.name.split(" ")[0]}
                          </button>
                          <button
                            onClick={() =>
                              setPeopleInsight(
                                peopleInsight === p.id ? null : p.id,
                              )
                            }
                          >
                            <Sparkles size={16} /> Get insights{" "}
                            <ChevronDown size={15} />
                          </button>
                        </div>
                        {peopleInsight === p.id && (
                          <div className="person-insight">
                            <Sparkles size={15} />
                            <span>{p.insight}</span>
                            <button onClick={() => note("acme")}>
                              View note
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {page === "meeting" && (
                <div className="meeting-scene">
                  <div className="meeting-topbar">
                    <strong>Acme Corp · Quarterly Business Review</strong>
                    <div>
                      <ShieldCheck size={17} />
                      <span className="recording-dot" /> REC{" "}
                      <Sparkles size={17} />
                    </div>
                  </div>
                  <div className="meeting-stage">
                    <div className="video-area">
                      <div className="video-person">
                        <span className="video-avatar">AB</span>
                        <strong>Ava Brooks</strong>
                        <small>Acme Corp</small>
                        <span className="video-name">Ava Brooks</span>
                      </div>
                      <div className="meeting-participants">
                        {avatars(["Xun Xiao", "Jordan Lee", "Priya Shah"])}
                        <span>+1</span>
                      </div>
                    </div>
                    <aside className="meeting-panel">
                      <div className="panel-title">
                        <div>
                          <span className="traffic">
                            <i />
                            <i />
                            <i />
                          </span>
                          <strong>My Notes</strong>
                        </div>
                        <button onClick={() => note("acme")}>
                          Open note <ExternalLink size={14} />
                        </button>
                      </div>
                      <div className="live-transcript">
                        <div className="transcript-control">
                          <span className="wave">▂▅▃▇▅▃▆▂▅▃</span>
                          <span>00:14:37</span>
                          <button
                            onClick={() => setPlaying(!playing)}
                            aria-label={playing ? "Pause" : "Play"}
                          >
                            {playing ? <Pause size={14} /> : <Play size={14} />}
                          </button>
                        </div>
                        <p>
                          <span className="avatar tone-purple">AB</span>
                          <span>
                            <strong>Ava Brooks</strong>
                            <small>14:37</small>
                            <br />
                            The sandbox access is the only thing we need before
                            procurement.
                          </span>
                        </p>
                      </div>
                      <div className="panel-meeting-title">
                        <strong>Acme Corp · Quarterly Business Review</strong>
                        <MoreHorizontal size={17} />
                      </div>
                      {quickBriefOn && (
                        <div className="live-brief">
                          <button
                            onClick={() => setLiveBriefOpen(!liveBriefOpen)}
                          >
                            <span>
                              <Sparkles size={15} /> Quick brief
                            </span>
                            <ChevronDown
                              size={16}
                              className={liveBriefOpen ? "rotate" : ""}
                            />
                          </button>
                          {liveBriefOpen && (
                            <ul>
                              {briefItems.slice(0, 2).map((b, i) => (
                                <li key={i}>
                                  {b.text}{" "}
                                  <button
                                    onClick={() => setSource(b.sources[0])}
                                  >
                                    {b.sources[0]}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      <div className="live-tabs">
                        <button
                          className={liveTab === "Notes" ? "active" : ""}
                          onClick={() => setLiveTab("Notes")}
                        >
                          Note
                        </button>
                        <button
                          className={liveTab === "Ask AI" ? "active" : ""}
                          onClick={() => setLiveTab("Ask AI")}
                        >
                          Ask AI
                        </button>
                        <button
                          className={liveTab === "Live Assist" ? "active" : ""}
                          onClick={() => setLiveTab("Live Assist")}
                        >
                          Live Assist{" "}
                          {liveStep > 0 && (
                            <span>{Math.min(liveStep + 1, 3)}</span>
                          )}
                        </button>
                      </div>
                      <div className="live-content">
                        {liveTab === "Notes" ? (
                          <div className="live-note">
                            <small>PRIVATE NOTE</small>
                            {liveNotes.map((x, i) => (
                              <p key={i}>{x}</p>
                            ))}
                            <div
                              contentEditable
                              suppressContentEditableWarning
                              data-placeholder="Write a note…"
                              onBlur={(e) => {
                                const text = e.currentTarget.textContent.trim();
                                if (text) {
                                  setLiveNotes((v) => [...v, text]);
                                  e.currentTarget.textContent = "";
                                }
                              }}
                            />
                          </div>
                        ) : liveTab === "Ask AI" ? (
                          <div className="meeting-ai">
                            <div className="meeting-ai-messages" aria-live="polite">
                              {liveMessages.map((message, index) => (
                                <div className={`live-message ${message.role}`} key={index}>
                                  {message.role === "assistant" && <Sparkles size={14} />}
                                  <span>{message.text}</span>
                                </div>
                              ))}
                            </div>
                            <div className="meeting-ai-bottom">
                              <div className="meeting-ai-prompts">
                                {["Summarize discussion", "List action items", "What changed?"].map((prompt) => (
                                  <button key={prompt} onClick={() => ask(prompt, "live")}>{prompt}</button>
                                ))}
                              </div>
                              <form
                                className="meeting-ai-composer"
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  ask(liveText, "live");
                                }}
                              >
                                <input
                                  value={liveText}
                                  onChange={(event) => setLiveText(event.target.value)}
                                  placeholder="Ask AI about this meeting…"
                                  aria-label="Ask AI about this meeting"
                                />
                                <button type="submit" aria-label="Send question"><ArrowUp size={18} /></button>
                              </form>
                            </div>
                          </div>
                        ) : (
                          <div className="assist-feed">
                            <div className="feed-date">LIVE · ACME QBR</div>
                            {[
                              {
                                id: "task",
                                time: "14:08",
                                label: "TASK DETECTED",
                                title: "Confirm rollout sequence with Ava",
                                body: "Customer Success can go first. Sales needs another week.",
                                source: "Live transcript",
                                action: "Add to note",
                              },
                              {
                                id: "source",
                                time: "14:23",
                                label: "SOURCE FOUND",
                                title: "SSO security review",
                                body: "The review was approved, while sandbox access is still pending.",
                                source: "My Notes · Aug 31",
                                action: "Add to note",
                              },
                              {
                                id: "question",
                                time: "14:37",
                                label: "OPEN QUESTION",
                                title: "Sandbox access owner",
                                body: "Ava needs access before procurement can move forward.",
                                source: "Live transcript",
                                action: "Add to note",
                              },
                            ]
                              .slice(0, Math.max(1, liveStep + 1))
                              .filter((c) => !dismissedCards.includes(c.id))
                              .map((c) => (
                                <div className="assist-card" key={c.id}>
                                  <div className="assist-card-meta">
                                    <span>
                                      <Sparkles size={13} />
                                      {c.label}
                                    </span>
                                    <time>{c.time}</time>
                                  </div>
                                  <h3>{c.title}</h3>
                                  <p>{c.body}</p>
                                  <button
                                    className="source-link"
                                    onClick={() => setSource(c.source)}
                                  >
                                    <Link2 size={13} />
                                    {c.source}
                                  </button>
                                  <div className="assist-card-actions">
                                    <button
                                      onClick={() =>
                                        ask(
                                          `Tell me more about ${c.title}`,
                                          "live",
                                        )
                                      }
                                    >
                                      Ask a question
                                    </button>
                                    <button
                                      onClick={() => {
                                        setLiveNotes((v) => [
                                          ...v,
                                          c.title + ". " + c.body,
                                        ]);
                                        showToast("Added to note");
                                      }}
                                    >
                                      {c.action}
                                    </button>
                                    <button
                                      className="dismiss"
                                      onClick={() =>
                                        setDismissedCards((v) => [...v, c.id])
                                      }
                                    >
                                      Dismiss
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </aside>
                  </div>
                  <div className="meeting-toolbar">
                    <div>
                      <button>
                        <MicOff size={18} /> Unmute
                      </button>
                      <button>
                        <VideoOff size={18} /> Start video
                      </button>
                    </div>
                    <div>
                      <button>
                        <Users size={18} /> Participants
                      </button>
                      <button>
                        <MessageSquare size={18} /> Chat
                      </button>
                      <button>
                        <Share2 size={18} /> Share
                      </button>
                      <button>
                        <MoreHorizontal size={18} /> More
                      </button>
                    </div>
                    <button
                      className="end-meeting"
                      onClick={() => note("acme", "Follow-ups", "post")}
                    >
                      End meeting
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      {settingsOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Settings"
          >
            <aside>
              <h2>Settings</h2>
              {[
                ["General", Settings],
                ["Notifications", CircleAlert],
                ["Connectors", Link2],
              ].map(([t, Icon]) => (
                <button
                  key={t}
                  className={settingsTab === t ? "active" : ""}
                  onClick={() => setSettingsTab(t)}
                >
                  <Icon size={18} />
                  {t}
                </button>
              ))}
            </aside>
            <div className="settings-content">
              <div className="settings-title">
                <h2>{settingsTab}</h2>
                <button
                  className="icon-btn"
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Close settings"
                >
                  <X size={20} />
                </button>
              </div>
              {settingsTab === "Connectors" ? (
                <>
                  <h3>Third-party services</h3>
                  <div className="connector-list">
                    {connectorServices.map(({ name, description, initial, color, background }) => (
                      <div className="connector-row" key={name}>
                        <span className="connector-icon" style={{ color, background }}>
                          {initial}
                        </span>
                        <span className="connector-copy">
                          <strong>{name}</strong>
                          {description && <small>{description}</small>}
                        </span>
                        {connected.includes(name) ? (
                          <span className="connected">
                            <Check size={16} />{" "}
                            {name === "Google"
                              ? "xun.xiao@gmail.com"
                              : "Connected"}
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setConnected((v) => [...v, name]);
                              showToast(`${name} connected`);
                            }}
                          >
                            Connect <ExternalLink size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : settingsTab === "General" ? (
                <div className="settings-general">
                  <div>
                    <span>
                      <strong>Quick brief</strong>
                      <small>Prepare context for upcoming meetings</small>
                    </span>
                    <button
                      className={`switch ${quickBriefOn ? "on" : ""}`}
                      onClick={() => setQuickBriefOn(!quickBriefOn)}
                      aria-label="Toggle Quick brief"
                    >
                      <i />
                    </button>
                  </div>
                  <div>
                    <span>
                      <strong>Auto-start My Notes</strong>
                      <small>
                        Start a note when an eligible meeting begins
                      </small>
                    </span>
                    <button
                      className="switch on"
                      onClick={() => showToast("Auto-start setting updated")}
                      aria-label="Toggle auto-start"
                    >
                      <i />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="settings-general">
                  <div>
                    <span>
                      <strong>Follow-up updates</strong>
                      <small>Show activity from routines and tasks</small>
                    </span>
                    <button
                      className="switch on"
                      onClick={() => showToast("Notification setting updated")}
                      aria-label="Toggle notifications"
                    >
                      <i />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {personPicker && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPersonPicker(false);
          }}
        >
          <div
            className="person-picker"
            role="dialog"
            aria-modal="true"
            aria-label="Follow a person"
          >
            <div className="picker-head">
              <h2>Follow a person</h2>
              <button
                className="icon-btn"
                onClick={() => setPersonPicker(false)}
                aria-label="Close person picker"
              >
                <X size={18} />
              </button>
            </div>
            <div className="picker-search">
              <Search size={16} />
              <input
                value={personSearch}
                onChange={(e) => setPersonSearch(e.target.value)}
                placeholder="Search people"
                autoFocus
              />
            </div>
            <div className="picker-list">
              {allPeople
                .filter(
                  (p) =>
                    !follows.includes(p.id) &&
                    p.name.toLowerCase().includes(personSearch.toLowerCase()),
                )
                .map((p) => (
                  <div key={p.id}>
                    <span className={`avatar tone-${p.tone}`}>
                      {p.initials}
                    </span>
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.role}</small>
                    </span>
                    <button
                      onClick={() => {
                        setFollows((v) => [...v, p.id]);
                        setPersonPicker(false);
                        setPersonSearch("");
                        showToast(`Following ${p.name}`);
                      }}
                    >
                      Follow
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {source && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSource(null);
          }}
        >
          <div className="source-modal" role="dialog" aria-modal="true">
            <div className="source-top">
              <span className="feature-icon blue">
                <Link2 size={19} />
              </span>
              <button
                className="icon-btn"
                onClick={() => setSource(null)}
                aria-label="Close source"
              >
                <X size={18} />
              </button>
            </div>
            <p className="eyebrow">SOURCE</p>
            <h2>{source}</h2>
            <p>
              {source.includes("Gmail")
                ? "Ava’s recent email covers the phased-seat proposal and pricing review."
                : "Previous meeting notes record the SSO approval and open sandbox access."}
            </p>
            <button
              className="primary-btn"
              onClick={() => {
                setSource(null);
                showToast("Source opened");
              }}
            >
              Open source <ExternalLink size={15} />
            </button>
          </div>
        </div>
      )}
      {taskConversation && (
        <div
          className="task-frame-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setTaskConversation(null);
          }}
        >
          <div
            className={`task-frame-shell ${taskFrameExpanded ? "expanded" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={`AI conversation: ${taskConversation.title}`}
          >
            <iframe
              title={`AI conversation for ${taskConversation.title}`}
              src={`/task-assistant.html?${new URLSearchParams(taskConversation).toString()}`}
            />
          </div>
        </div>
      )}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}
function Brief({ items = briefItems, onSource }) {
  return (
    <section className="brief-panel">
      <div className="brief-heading">
        <span className="feature-icon purple">
          <Sparkles size={17} />
        </span>
        <div>
          <strong>Quick brief</strong>
          <small>Prepared for this meeting</small>
        </div>
        <span className="status good">
          <Check size={13} /> Ready
        </span>
      </div>
      <ul>
        {items.map((b, i) => (
          <li key={i}>
            {b.text}{" "}
            <span className="citations">
              {b.sources.map((s) => (
                <button key={s} onClick={() => onSource(s)}>
                  {s} <ExternalLink size={11} />
                </button>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
function FollowupBoard({
  items,
  followStatus,
  expanded,
  setExpanded,
  openConversation,
  meeting,
}) {
  const state = (item) => followStatus[item.id] || item.state;
  const action = (item) =>
    openConversation(item, { meeting, state: state(item) });
  return (
    <div className="follow-board">
      <div className="follow-items">
        {items
          .filter((x) => x.kind === "Workflow")
          .map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div className="follow-item" key={item.id}>
                <div className="follow-item-top">
                  <span className="follow-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.kind}</small>
                  </div>
                  <button
                    className={`follow-action ${state(item) === "needs-action" ? "needs" : ""}`}
                    onClick={() => action(item)}
                  >
                    {state(item) === "needs-action" ? (
                      <>
                        <CircleAlert size={14} /> Need action
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} /> View result
                      </>
                    )}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                    aria-label="Expand follow-up"
                  >
                    <ChevronDown
                      size={17}
                      className={expanded === item.id ? "rotate" : ""}
                    />
                  </button>
                </div>
                {expanded === item.id && (
                  <div className="follow-details">
                    <p>{item.detail}</p>
                    <button onClick={() => action(item)}>
                      {state(item) === "needs-action"
                        ? "Review summary"
                        : "Open result"}{" "}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <h3>Suggested</h3>
      <div className="follow-items">
        {items
          .filter((x) => x.kind === "Suggested")
          .map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div className="follow-item" key={item.id}>
                <div className="follow-item-top">
                  <span className="follow-icon suggested">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <button
                    className="follow-action draft"
                    onClick={() => action(item)}
                  >
                    {state(item) === "completed" ? (
                      <>
                        <CheckCircle2 size={14} /> View result
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />{" "}
                        {item.id === "staffing" ? "Create" : "Draft"}
                      </>
                    )}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                    aria-label="Expand suggestion"
                  >
                    <ChevronDown
                      size={17}
                      className={expanded === item.id ? "rotate" : ""}
                    />
                  </button>
                </div>
                {expanded === item.id && (
                  <div className="follow-details">
                    <p>{item.detail}</p>
                    <button onClick={() => action(item)}>
                      Ask AI about this <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
