export interface AppNotification {
  id: string;
  type: 'status_update' | 'emergency' | 'reminder' | 'community';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  reportId?: string;
  actionUrl?: string;
}

export class NotificationService {
  private notifications: AppNotification[] = [];
  private listeners: ((notifications: AppNotification[]) => void)[] = [];

  constructor() {
    // Load notifications from localStorage
    const saved = localStorage.getItem('cityfix_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }

  subscribe(listener: (notifications: AppNotification[]) => void) {
    this.listeners.push(listener);
    listener(this.notifications);
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify() {
    // Save to localStorage
    localStorage.setItem('cityfix_notifications', JSON.stringify(this.notifications));
    
    // Notify listeners
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: AppNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    this.notifications.unshift(newNotification);
    this.notify();

    // Show browser notification if permission granted
    this.showBrowserNotification(newNotification);

    return newNotification;
  }

  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notify();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notify();
  }

  deleteNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notify();
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Report-specific notification generators
  createReportStatusNotification(reportId: string, reportTitle: string, newStatus: string) {
    const statusMessages = {
      'In Progress': `Your report "${reportTitle}" is now being reviewed by the appropriate department.`,
      'Resolved': `Great news! Your report "${reportTitle}" has been resolved.`,
      'Closed': `Your report "${reportTitle}" has been closed.`
    };

    this.addNotification({
      type: 'status_update',
      title: 'Report Status Updated',
      message: statusMessages[newStatus as keyof typeof statusMessages] || `Your report status has changed to ${newStatus}`,
      reportId
    });
  }

  createReportAssignedNotification(reportId: string, reportTitle: string, department: string) {
    this.addNotification({
      type: 'status_update',
      title: 'Report Assigned',
      message: `Your report "${reportTitle}" has been assigned to ${department}.`,
      reportId
    });
  }

  createCommunityVoteNotification(reportTitle: string, voteCount: number) {
    this.addNotification({
      type: 'community',
      title: 'Popular Issue',
      message: `"${reportTitle}" has received ${voteCount} votes from the community.`,
    });
  }

  createEmergencyNotification(message: string) {
    this.addNotification({
      type: 'emergency',
      title: 'Emergency Alert',
      message
    });
  }

  createReminderNotification(reportId: string, reportTitle: string, message: string) {
    this.addNotification({
      type: 'reminder',
      title: 'Follow Up Required',
      message,
      reportId
    });
  }

  private showBrowserNotification(notification: AppNotification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id
      });
    }
  }

  static async requestPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Simulate report status changes for demo
  simulateReportUpdates(reportId: string, reportTitle: string) {
    // Simulate assignment after 5 seconds
    setTimeout(() => {
      this.createReportAssignedNotification(reportId, reportTitle, 'Public Works Department');
    }, 5000);

    // Simulate progress update after 15 seconds
    setTimeout(() => {
      this.createReportStatusNotification(reportId, reportTitle, 'In Progress');
    }, 15000);

    // Simulate completion after 30 seconds (for demo purposes)
    setTimeout(() => {
      this.createReportStatusNotification(reportId, reportTitle, 'Resolved');
    }, 30000);
  }
}

export const notificationService = new NotificationService();
