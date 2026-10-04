import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Package,
  Search,
  Send,
  Settings,
  User,
  CheckCheck,
  Phone,
  MoreVertical,
} from 'lucide-react';
import OwnerSidebar from '../components/sidebars/OwnerSidebar';
import { authApi } from '../auth/api';

interface Conversation {
  id: string;
  senderName: string;
  role: 'Client' | 'Staff';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  avatarInitial: string;
  phone?: string;
  email?: string;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    senderName: 'Marco Santos',
    role: 'Client',
    lastMessage: 'Hi, available ba ang VIP groom room sa Sunday ng 2 PM?',
    timestamp: '10:42 AM',
    unreadCount: 2,
    online: true,
    avatarInitial: 'M',
    phone: '+63 917 123 4567',
    email: 'marco.santos@email.com',
  },
  {
    id: '2',
    senderName: 'Staff_Juan',
    role: 'Staff',
    lastMessage: 'Owner, na-received na po natin ang new stocks ng Pomade.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    online: true,
    avatarInitial: 'J',
    phone: '+63 928 987 6543',
    email: 'juan.barber@hustlefriends.ph',
  },
  {
    id: '3',
    senderName: 'Kiko Reyes',
    role: 'Client',
    lastMessage: 'Salamat po sa magandang service kanina! Highly recommended.',
    timestamp: 'Oct 2',
    unreadCount: 0,
    online: false,
    avatarInitial: 'K',
    phone: '+63 905 555 1234',
    email: 'kiko.reyes@email.com',
  },
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', sender: 'them', text: 'Good morning, Hustle Friends!', time: '10:40 AM' },
    { id: 'm2', sender: 'them', text: 'Hi, available ba ang VIP groom room sa Sunday ng 2 PM?', time: '10:42 AM' },
  ],
  '2': [
    { id: 'm3', sender: 'them', text: 'Owner, na-received na po natin ang new stocks ng Pomade.', time: 'Yesterday 4:15 PM' },
    { id: 'm4', sender: 'me', text: 'Salamat, Juan! Paki-update rin sa POS inventory natin.', time: 'Yesterday 4:30 PM' },
  ],
  '3': [
    { id: 'm5', sender: 'them', text: 'Salamat po sa magandang service kanina! Highly recommended.', time: 'Oct 2 6:00 PM' },
    { id: 'm6', sender: 'me', text: 'Maraming salamat po, Sir Kiko! Kita-kits ulit sa susunod na cut.', time: 'Oct 2 6:05 PM' },
  ],
};

export default function OwnerMessages() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeId, setActiveId] = useState<string>('1');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const memberName = 'Owner Account';
  const userInitial = 'O';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsNotifMenuOpen(false);
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeAllDropdowns = () => {
    setIsNotifMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    closeAllDropdowns();
    setError('');
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      window.location.hash = '#login';
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : 'Unable to log out.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const showNotice = (message: string) => {
    setNotice(message);
    setIsSidebarOpen(false);
    closeAllDropdowns();
    window.setTimeout(() => setNotice(''), 3000);
  };

  const activeConversation = conversations.find((c) => c.id === activeId) || conversations[0];
  const activeMessages = messagesMap[activeId] || [];

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unreadCount: 0 } : item))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, lastMessage: inputText.trim(), timestamp: 'Just now' } : c
      )
    );

    setInputText('');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Fixed Desktop Sidebar & Mobile Drawer */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Owner navigation">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full w-72">
            <OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:ml-72 flex flex-col">
        {/* Header Bar - Identical to OwnerDashboard */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-3.5 backdrop-blur-lg transition-all sm:h-20 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-800 shadow-xs transition-all duration-200 hover:bg-zinc-100 active:scale-95 lg:hidden"
              aria-label="Open navigation"
              aria-expanded={isSidebarOpen}
            >
              <Menu size={18} strokeWidth={2.2} />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block h-6 w-0.5 rounded-full bg-[#c7a65e]/40" />
              <div>
                <p className="text-[8px] sm:text-[9px] font-black tracking-[0.28em] text-[#c7a65e] uppercase">Portal</p>
                <p className="text-xs sm:text-base font-black leading-none tracking-tighter uppercase text-zinc-900">
                  Owner <span className="font-light text-zinc-400">terminal</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              type="button"
              onClick={() => showNotice('New conversation modal will open soon.')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95"
            >
              <Package size={14} strokeWidth={2.5} />
              <span>Compose Message</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setIsNotifMenuOpen(!isNotifMenuOpen);
                  setIsProfileMenuOpen(false);
                }}
                className={`group relative flex h-10 items-center gap-2 rounded-2xl border px-3 transition-all duration-200 active:scale-95 ${
                  isNotifMenuOpen
                    ? 'border-[#c7a65e] bg-zinc-950 text-[#c7a65e] shadow-md shadow-zinc-950/10'
                    : 'border-zinc-200/80 bg-zinc-50/50 text-zinc-700 hover:border-[#c7a65e]/60 hover:bg-zinc-100/80'
                }`}
                aria-label="View notifications"
              >
                <div className="relative flex items-center justify-center">
                  <Bell
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform duration-300 group-hover:-rotate-12 ${
                      isNotifMenuOpen ? 'text-[#c7a65e]' : 'text-zinc-700 group-hover:text-zinc-950'
                    }`}
                  />
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#c7a65e] ring-2 ring-white animate-pulse" />
                </div>
                <span
                  className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-lg px-1.5 text-[9px] font-black tracking-tight transition-colors ${
                    isNotifMenuOpen
                      ? 'bg-[#c7a65e] text-zinc-950'
                      : 'bg-white border border-zinc-200/60 text-zinc-800 shadow-2xs group-hover:border-[#c7a65e]/30'
                  }`}
                >
                  3
                </span>
              </button>

              {isNotifMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border border-zinc-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
                    <p className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">Notifications</p>
                    <button type="button" onClick={() => setIsNotifMenuOpen(false)} className="text-[9px] font-bold text-[#c7a65e] uppercase transition hover:text-[#a37d2d]">Mark as read</button>
                  </div>
                  <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
                      <Bell size={20} strokeWidth={2} />
                    </div>
                    <p className="text-xs font-black tracking-wide text-zinc-700 uppercase">You're all caught up!</p>
                    <p className="mt-1.5 text-xs text-zinc-500">No new notifications or alerts at the moment.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotifMenuOpen(false);
                }}
                className={`flex items-center gap-2 rounded-full border bg-white p-1 transition-all duration-200 active:scale-95 sm:pr-3 ${
                  isProfileMenuOpen
                    ? 'border-[#c7a65e] ring-2 ring-[#c7a65e]/20 shadow-sm'
                    : 'border-zinc-200/90 shadow-2xs hover:border-[#c7a65e]'
                }`}
                aria-label="User menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-black text-[#c7a65e] shadow-xs">
                  {userInitial}
                </div>
                <span className="hidden sm:inline-block max-w-28 lg:max-w-36 truncate text-xs font-bold tracking-tight text-zinc-800 uppercase">
                  {memberName}
                </span>
                <ChevronDown
                  size={14}
                  className={`hidden sm:block text-zinc-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? 'rotate-180 text-[#c7a65e]' : ''
                  }`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                  <div className="border-b border-zinc-100 px-3 py-2.5">
                    <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">Logged in as</p>
                    <p className="truncate text-xs font-black text-zinc-900 uppercase">{memberName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showNotice('Profile settings will be available here soon.')}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <User size={15} />
                    <span>My Profile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showNotice('System settings will be available here soon.')}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <Settings size={15} />
                    <span>Settings</span>
                  </button>
                  <div className="my-1 border-t border-zinc-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                  >
                    <LogOut size={15} />
                    <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 mx-auto w-full max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12 flex flex-col">
          {error && (
            <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          )}

          {/* Title Header */}
          <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[8px] sm:text-[9px] font-black tracking-[0.35em] text-[#c7a65e] uppercase">
                COMMUNICATION CENTER
              </p>
              <h1 className="mt-2 text-3xl font-black italic leading-[0.85] tracking-[-0.08em] sm:mt-3 sm:text-6xl lg:text-7xl">
                INBOX &
              </h1>
              <p className="text-2xl font-black italic leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#aeb3b8] sm:text-5xl lg:text-6xl">
                MESSAGES.
              </p>
            </div>
          </header>

          {notice && (
            <p className="mb-5 rounded-xl border border-[#ead9b8] bg-white px-4 py-3 text-sm text-[#8d6c2c]" role="status">
              {notice}
            </p>
          )}

          {/* Chat Window Container */}
          <div className="grid flex-1 grid-cols-1 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)] lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr]">
            {/* Conversations Sidebar */}
            <div className="flex flex-col border-r border-zinc-100 bg-zinc-50/40">
              <div className="p-4 border-b border-zinc-100">
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200/80 bg-white py-2 pl-9 pr-3.5 text-xs font-medium outline-none transition placeholder:text-zinc-400 focus:border-[#c7a65e] focus:ring-1 focus:ring-[#c7a65e]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-zinc-100/60 scrollbar-none">
                {filteredConversations.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectConversation(item.id)}
                      className={`flex w-full items-start gap-3 p-4 text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-white shadow-xs border-l-4 border-l-[#c7a65e]'
                          : 'hover:bg-zinc-100/60'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-xs font-black text-[#c7a65e] shadow-xs">
                          {item.avatarInitial}
                        </div>
                        {item.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="truncate text-xs font-black uppercase text-zinc-900">
                            {item.senderName}
                          </p>
                          <span className="text-[9px] font-extrabold text-zinc-400 uppercase">
                            {item.timestamp}
                          </span>
                        </div>

                        <div className="mt-0.5 flex items-center justify-between gap-1">
                          <p className="truncate text-[11px] font-medium text-zinc-500">
                            {item.lastMessage}
                          </p>
                          {item.unreadCount > 0 && (
                            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c7a65e] px-1 text-[9px] font-black text-zinc-950">
                              {item.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Message Pane */}
            <div className="flex flex-col h-150 lg:h-auto bg-white">
              {/* Active Header */}
              {activeConversation && (
                <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-xs font-black text-[#c7a65e]">
                        {activeConversation.avatarInitial}
                      </div>
                      {activeConversation.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-tight text-zinc-900">
                        {activeConversation.senderName}
                      </h2>
                      <p className="text-[10px] font-bold tracking-wider text-[#b08b3a] uppercase">
                        {activeConversation.role} • {activeConversation.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showNotice(`Calling ${activeConversation.senderName}...`)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition hover:border-[#c7a65e] hover:text-[#b08b3a]"
                    >
                      <Phone size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => showNotice('Message options will open soon.')}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition hover:border-[#c7a65e] hover:text-[#b08b3a]"
                    >
                      <MoreVertical size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Thread Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/20 scrollbar-none">
                {activeMessages.map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                          isMe
                            ? 'bg-zinc-950 text-white rounded-br-xs shadow-xs'
                            : 'bg-zinc-100 text-zinc-900 border border-zinc-200/60 rounded-bl-xs'
                        }`}
                      >
                        <p className="font-medium">{msg.text}</p>
                      </div>
                      <span className="mt-1 flex items-center gap-1 text-[9px] font-extrabold text-zinc-400 uppercase">
                        {msg.time}
                        {isMe && <CheckCheck size={12} className="text-[#c7a65e]" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Box */}
              <form onSubmit={handleSendMessage} className="border-t border-zinc-100 p-4 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your reply message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-3 px-4 text-xs font-medium text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-[#c7a65e] shadow-sm transition hover:bg-[#c7a65e] hover:text-zinc-950 disabled:opacity-40 disabled:hover:bg-zinc-950 disabled:hover:text-[#c7a65e]"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Branding */}
          <footer className="mt-8 border-t border-zinc-200/60 pt-6 text-center text-xs font-bold text-zinc-400">
            <p className="tracking-widest uppercase">Hustle Friends Co. ® 2026</p>
            <p className="mt-1 text-[10px] font-black tracking-[0.2em] text-[#c7a65e] uppercase">
              Work Hard • Stay Sharp
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}