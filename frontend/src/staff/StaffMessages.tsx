import StaffSidebar from '../components/sidebars/StaffSidebar';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Plus,
  Search,
  Send,
  Settings,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { authApi, type StaffMessage } from '../auth/api';

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  email?: string;
}

interface ChatMessage {
  sender: 'client' | 'staff';
  text: string;
  time: string;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    name: 'Justine Soliman',
    role: 'VIP Client',
    lastMessage: 'Good afternoon! Pwede bang i-reschedule yung appointment ko bukas?',
    time: '02:45 PM',
    unread: true,
  },
  {
    id: '2',
    name: 'Tristan Bautista',
    role: 'Regular Client',
    lastMessage: 'Sige po, salamat sa mabilis na assist sa Walk-in POS payment kanina.',
    time: '11:20 AM',
    unread: false,
  },
  {
    id: '3',
    name: 'Angieee Tigasin',
    role: 'VIP Client',
    lastMessage: 'Available po ba yung Matte Pomade stock ninyo ngayon?',
    time: 'Yesterday',
    unread: false,
  },
];

function toChatMessages(inquiry: StaffMessage): ChatMessage[] {
  return [
    {
      sender: 'client',
      text: `${inquiry.subject}: ${inquiry.message}`,
      time: new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    ...inquiry.replies.map((reply) => ({
      sender: 'staff' as const,
      text: reply.message,
      time: new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })),
  ];
}

export default function StaffMessages() {
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChat, setActiveChat] = useState(initialConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'client', text: 'Good afternoon! Pwede bang i-reschedule yung appointment ko bukas?', time: '02:45 PM' }
  ]);
  const [staffMessages, setStaffMessages] = useState<StaffMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const memberName = 'Staff Member';
  const userInitial = 'S';

  useEffect(() => {
    const loadStaffMessages = async () => {
      try {
        const response = await authApi.listStaffMessages();
        if (!response.messages.length) return;

        const contactMessages = response.messages.map((item: StaffMessage) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          role: 'Website Contact',
          lastMessage: item.message,
          time: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: !item.isRead,
        }));
        setConversations(contactMessages);
        setActiveChat(contactMessages[0]);
        setStaffMessages(response.messages);
        setChatMessages(toChatMessages(response.messages[0]));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load messages.');
      }
    };

    void loadStaffMessages();
  }, []);

  const selectConversation = (conversation: Conversation) => {
    setActiveChat(conversation);
    const selectedMessage = staffMessages.find((item) => item.id === conversation.id);
    if (selectedMessage) setChatMessages(toChatMessages(selectedMessage));
  };

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
    window.setTimeout(() => setNotice(''), 3000);
    setIsSidebarOpen(false);
    closeAllDropdowns();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || isSending) return;

    if (!staffMessages.length) {
      setChatMessages([
        ...chatMessages,
        { sender: 'staff', text: messageInput, time: 'Just now' }
      ]);
      setMessageInput('');
      showNotice('Message sent successfully.');
      return;
    }

    setIsSending(true);
    try {
      const response = await authApi.replyToStaffMessage(activeChat.id, messageInput.trim());
      setChatMessages((previous) => [
        ...previous,
        {
          sender: 'staff',
          text: response.reply.message,
          time: new Date(response.reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setStaffMessages((previous) => previous.map((item) => (
        item.id === activeChat.id ? { ...item, replies: [...item.replies, response.reply] } : item
      )));
      setMessageInput('');
      showNotice('Reply sent to the client email successfully.');
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to send reply.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <StaffSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
      </div>

      {/* Mobile Drawer Navigation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Staff navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full w-72">
            <StaffSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:ml-72">
        {/* Top Navigation Bar */}
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
                  Staff <span className="font-light text-zinc-400">terminal</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              type="button"
              onClick={() => showNotice('Action will be available here soon.')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Quick Action</span>
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

        {/* Staff Messages Main Content */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-4 sm:mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-[#735719]" role="status">{notice}</p>}

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
                Client Communication
              </div>
              <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.06em] uppercase sm:mt-3 sm:text-4xl lg:text-5xl">
                Staff <span className="text-zinc-400 italic">Messages</span>
              </h1>
            </div>
          </div>

          {/* Messages Layout Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
            {/* Conversations List Sidebar */}
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col">
              <div className="border-b border-zinc-200 px-5 py-4">
                <h2 className="text-sm font-black tracking-wider uppercase text-zinc-900">Conversations</h2>
              </div>
              <div className="p-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search client..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-xs font-bold text-zinc-800 placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="divide-y divide-zinc-100 overflow-y-auto max-h-125">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => selectConversation(conv)}
                    className={`w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-zinc-50 ${
                      activeChat.id === conv.id ? 'bg-[#fdf9ef]/70 border-l-4 border-[#c7a65e]' : ''
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-[#c7a65e]">
                      {conv.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-black text-zinc-900 uppercase truncate">{conv.name}</p>
                        <span className="text-[10px] text-zinc-400 whitespace-nowrap">{conv.time}</span>
                      </div>
                      <p className="mt-0.5 text-[10px] font-bold text-[#c7a65e] uppercase">{conv.role}</p>
                      <p className="mt-1 text-xs text-zinc-500 truncate">{conv.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Box Panel */}
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col h-150">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-[#c7a65e]">
                    {activeChat.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tight">{activeChat.name}</h3>
                    <p className="text-[10px] font-bold text-[#c7a65e] uppercase">{activeChat.role}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black tracking-wider text-emerald-700 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active now
                </span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fbfbfb]">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === 'staff' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'staff'
                          ? 'bg-zinc-950 text-white rounded-br-2xs'
                          : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-2xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="mt-1 text-[9px] text-zinc-400 uppercase tracking-wider">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Footer Input */}
              <form onSubmit={handleSendMessage} className="border-t border-zinc-200 p-4 bg-white flex items-center gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-xs font-bold text-zinc-800 placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSending || !activeChat.email}
                  className="flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-black tracking-wider text-white uppercase shadow-sm transition hover:bg-[#c7a65e] active:scale-95 disabled:cursor-wait disabled:opacity-60"
                >
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}