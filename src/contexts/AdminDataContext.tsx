import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type MemberStatus = "approved" | "pending" | "rejected";
export type PaymentStatus = "paid" | "pending" | "failed";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  payam: string;
  currentLocation?: string;
  status: MemberStatus;
  membershipType?: string;
  appliedDate: string;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  id: string;
  memberName: string;
  memberEmail: string;
  amount: string;
  type: string;
  date: string;
  status: PaymentStatus;
  method: string;
}

export type NotificationType = "approval" | "message";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  link: string;
}

export interface Election {
  id: string;
  title: string;
  positions: string[];
  status: string;
  startDate: string;
  endDate: string;
  totalVoters: number;
  nominationsReceived: number;
  votesCast: number;
}

export interface Nomination {
  id: string;
  candidateName: string;
  position: string;
  electionId: string;
  status: "pending" | "approved";
  submittedDate: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  version: string;
  date: string;
  size: string;
  type: string;
  status: "published" | "draft";
  fileUrl?: string;
}

export interface AdminExecutiveMember {
  id: string;
  name: string;
  position: string;
  description: string;
  color: string;
  icon?: string;
  image?: string;
}

export interface AdminPayamRepresentative {
  id: string;
  name: string;
  payam: string;
}

export interface AdminEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "upcoming" | "past";
  attendees: number;
  status: "active" | "completed";
  image?: string;
}

interface AdminDataContextType {
  members: Member[];
  payments: Payment[];
  notifications: AdminNotification[];
  elections: Election[];
  nominations: Nomination[];
  documents: DocumentItem[];
  executiveCommittee: AdminExecutiveMember[];
  payamRepresentatives: AdminPayamRepresentative[];
  events: AdminEvent[];
  addMember: (member: Omit<Member, "id" | "status" | "appliedDate" | "paymentStatus">) => void;
  approveMember: (id: string) => void;
  rejectMember: (id: string) => void;
  addPayment: (payment: Omit<Payment, "id" | "date" | "status"> & { status?: PaymentStatus }) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addElection: (election: Omit<Election, "id" | "nominationsReceived" | "votesCast">) => void;
  updateElection: (id: string, updates: Partial<Election>) => void;
  deleteElection: (id: string) => void;
  addNomination: (nomination: Omit<Nomination, "id" | "submittedDate">) => void;
  approveNomination: (id: string) => void;
  rejectNomination: (id: string) => void;
  addDocument: (document: Omit<DocumentItem, "id" | "date">) => void;
  updateDocument: (id: string, updates: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;
  addExecutiveMember: (member: Omit<AdminExecutiveMember, "id">) => void;
  updateExecutiveMember: (id: string, updates: Partial<AdminExecutiveMember>) => void;
  deleteExecutiveMember: (id: string) => void;
  addPayamRepresentative: (rep: Omit<AdminPayamRepresentative, "id">) => void;
  updatePayamRepresentative: (id: string, updates: Partial<AdminPayamRepresentative>) => void;
  deletePayamRepresentative: (id: string) => void;
  addEvent: (event: Omit<AdminEvent, "id">) => void;
  updateEvent: (id: string, updates: Partial<AdminEvent>) => void;
  deleteEvent: (id: string) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  members: "nca_admin_members",
  payments: "nca_admin_payments",
  notifications: "nca_admin_notifications",
  elections: "nca_admin_elections",
  nominations: "nca_admin_nominations",
  documents: "nca_admin_documents",
  executiveCommittee: "nca_admin_executive_committee",
  payamRepresentatives: "nca_admin_payam_representatives",
  events: "nca_admin_events",
};

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [executiveCommittee, setExecutiveCommittee] = useState<AdminExecutiveMember[]>([]);
  const [payamRepresentatives, setPayamRepresentatives] = useState<AdminPayamRepresentative[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedMembers = localStorage.getItem(STORAGE_KEYS.members);
      const storedPayments = localStorage.getItem(STORAGE_KEYS.payments);
      const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
      const storedElections = localStorage.getItem(STORAGE_KEYS.elections);
      const storedNominations = localStorage.getItem(STORAGE_KEYS.nominations);
      const storedDocuments = localStorage.getItem(STORAGE_KEYS.documents);
      const storedExecutive = localStorage.getItem(STORAGE_KEYS.executiveCommittee);
      const storedPayam = localStorage.getItem(STORAGE_KEYS.payamRepresentatives);
      const storedEvents = localStorage.getItem(STORAGE_KEYS.events);

      if (storedMembers) setMembers(JSON.parse(storedMembers));
      if (storedPayments) setPayments(JSON.parse(storedPayments));
      if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
      if (storedElections) setElections(JSON.parse(storedElections));
      if (storedNominations) setNominations(JSON.parse(storedNominations));
      if (storedDocuments) setDocuments(JSON.parse(storedDocuments));
      if (storedExecutive) setExecutiveCommittee(JSON.parse(storedExecutive));
      if (storedPayam) setPayamRepresentatives(JSON.parse(storedPayam));
      if (storedEvents) setEvents(JSON.parse(storedEvents));
    } catch {
      // Ignore parse errors and start with empty data
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.payments, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.elections, JSON.stringify(elections));
  }, [elections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.nominations, JSON.stringify(nominations));
  }, [nominations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.documents, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.executiveCommittee, JSON.stringify(executiveCommittee));
  }, [executiveCommittee]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.payamRepresentatives, JSON.stringify(payamRepresentatives));
  }, [payamRepresentatives]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  }, [events]);

  const addMember: AdminDataContextType["addMember"] = (input) => {
    const now = new Date();
    const newMember: Member = {
      id: crypto.randomUUID(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      payam: input.payam,
      currentLocation: input.currentLocation,
      membershipType: input.membershipType,
      appliedDate: now.toISOString(),
      status: "pending",
      paymentStatus: "pending",
    };

    setMembers((prev) => [newMember, ...prev]);

    // Create an admin notification
    const notification: AdminNotification = {
      id: crypto.randomUUID(),
      type: "approval",
      title: "New Membership Application",
      description: `${newMember.firstName} ${newMember.lastName} has applied for membership.`,
      time: now.toISOString(),
      unread: true,
      link: "/admin/members",
    };
    setNotifications((prev) => [notification, ...prev]);
  };

  const approveMember = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: "approved" as MemberStatus }
          : m
      )
    );
  };

  const rejectMember = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: "rejected" as MemberStatus }
          : m
      )
    );
  };

  const addPayment: AdminDataContextType["addPayment"] = (input) => {
    const now = new Date();
    const payment: Payment = {
      id: crypto.randomUUID(),
      memberName: input.memberName,
      memberEmail: input.memberEmail,
      amount: input.amount,
      type: input.type,
      method: input.method,
      date: now.toISOString(),
      status: input.status ?? "pending",
    };
    setPayments((prev) => [payment, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const addElection: AdminDataContextType["addElection"] = (input) => {
    const election: Election = {
      id: crypto.randomUUID(),
      title: input.title,
      positions: input.positions,
      status: input.status,
      startDate: input.startDate,
      endDate: input.endDate,
      totalVoters: input.totalVoters,
      nominationsReceived: 0,
      votesCast: 0,
    };
    setElections((prev) => [election, ...prev]);
  };

  const updateElection = (id: string, updates: Partial<Election>) => {
    setElections((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const deleteElection = (id: string) => {
    setElections((prev) => prev.filter((e) => e.id !== id));
    setNominations((prev) => prev.filter((n) => n.electionId !== id));
  };

  const addNomination: AdminDataContextType["addNomination"] = (input) => {
    const now = new Date();
    const nomination: Nomination = {
      id: crypto.randomUUID(),
      candidateName: input.candidateName,
      position: input.position,
      electionId: input.electionId,
      status: "pending",
      submittedDate: now.toISOString(),
    };
    setNominations((prev) => [nomination, ...prev]);
    setElections((prev) =>
      prev.map((e) =>
        e.id === input.electionId
          ? { ...e, nominationsReceived: e.nominationsReceived + 1 }
          : e
      )
    );
  };

  const approveNomination = (id: string) => {
    setNominations((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "approved" as const } : n))
    );
  };

  const rejectNomination = (id: string) => {
    setNominations((prev) => prev.filter((n) => n.id !== id));
  };

  const addDocument: AdminDataContextType["addDocument"] = (input) => {
    const now = new Date();
    const document: DocumentItem = {
      id: crypto.randomUUID(),
      title: input.title,
      category: input.category,
      version: input.version,
      size: input.size,
      type: input.type,
      status: input.status,
      fileUrl: input.fileUrl,
      date: now.toISOString(),
    };
    setDocuments((prev) => [document, ...prev]);
  };

  const updateDocument = (id: string, updates: Partial<DocumentItem>) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const addExecutiveMember: AdminDataContextType["addExecutiveMember"] = (input) => {
    const member: AdminExecutiveMember = {
      id: crypto.randomUUID(),
      name: input.name,
      position: input.position,
      description: input.description,
      color: input.color || "from-purple-500 to-pink-500",
      icon: input.icon,
      image: input.image,
    };
    setExecutiveCommittee((prev) => [member, ...prev]);
  };

  const updateExecutiveMember = (id: string, updates: Partial<AdminExecutiveMember>) => {
    setExecutiveCommittee((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteExecutiveMember = (id: string) => {
    setExecutiveCommittee((prev) => prev.filter((m) => m.id !== id));
  };

  const addPayamRepresentative: AdminDataContextType["addPayamRepresentative"] = (input) => {
    const rep: AdminPayamRepresentative = {
      id: crypto.randomUUID(),
      name: input.name,
      payam: input.payam,
    };
    setPayamRepresentatives((prev) => [rep, ...prev]);
  };

  const updatePayamRepresentative = (id: string, updates: Partial<AdminPayamRepresentative>) => {
    setPayamRepresentatives((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const deletePayamRepresentative = (id: string) => {
    setPayamRepresentatives((prev) => prev.filter((r) => r.id !== id));
  };

  const addEvent: AdminDataContextType["addEvent"] = (input) => {
    const event: AdminEvent = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      date: input.date,
      time: input.time,
      location: input.location,
      type: input.type,
      attendees: input.attendees || 0,
      status: input.status,
      image: input.image,
    };
    setEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (id: string, updates: Partial<AdminEvent>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AdminDataContext.Provider
      value={{
        members,
        payments,
        notifications,
        elections,
        nominations,
        documents,
        executiveCommittee,
        payamRepresentatives,
        events,
        addMember,
        approveMember,
        rejectMember,
        addPayment,
        markNotificationRead,
        markAllNotificationsRead,
        addElection,
        updateElection,
        deleteElection,
        addNomination,
        approveNomination,
        rejectNomination,
        addDocument,
        updateDocument,
        deleteDocument,
        addExecutiveMember,
        updateExecutiveMember,
        deleteExecutiveMember,
        addPayamRepresentative,
        updatePayamRepresentative,
        deletePayamRepresentative,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return ctx;
};




