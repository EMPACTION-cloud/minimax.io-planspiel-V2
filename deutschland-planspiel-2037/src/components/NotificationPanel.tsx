import React from 'react';
import { NotificationMessage } from '../types';
import { formatDate } from '../utils/formatters';

interface NotificationPanelProps {
  notifications: NotificationMessage[];
  onMarkAsRead: (id: string) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onMarkAsRead }) => {
  if (notifications.length === 0) return null;
  
  const getNotificationIcon = (type: NotificationMessage['type']) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '❌';
      case 'info': default: return 'ℹ️';
    }
  };
  
  const getNotificationColor = (type: NotificationMessage['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'info': default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };
  
  const unreadNotifications = notifications.filter(n => !n.read);
  
  return (
    <div className="fixed top-20 right-4 z-50 w-80 max-h-96 overflow-y-auto">
      <div className="space-y-2">
        {unreadNotifications.slice(0, 5).map(notification => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 shadow-lg ${getNotificationColor(notification.type)} animate-slide-in-right`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-lg">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-sm mt-1">{notification.message}</p>
                  <p className="text-xs mt-2 opacity-75">
                    {formatDate(notification.date, 'short')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                ×
              </button>
            </div>
            
            {notification.actions && notification.actions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <div className="flex space-x-2">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.action();
                        onMarkAsRead(notification.id);
                      }}
                      className="px-3 py-1 bg-white bg-opacity-80 rounded text-xs font-medium hover:bg-opacity-100 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {unreadNotifications.length > 5 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600">
              +{unreadNotifications.length - 5} weitere Benachrichtigungen
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;