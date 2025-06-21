'use client';
import { useState, useEffect, useRef } from 'react';
import { getRequest, isErrorResponse } from '@/lib/api/requestHelpers';
import { NotificationsResponse } from '@/type/notification';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<
    NotificationsResponse['result']
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest<NotificationsResponse['result']>(
        'notifications',
        null,
        { auth: true }
      );

      if (response && !isErrorResponse(response)) {
        setNotifications(response.result);
      } else {
        console.error('Failed to fetch notifications:', response);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBellClick = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  const formatNotificationTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return '🎉';
      case 'build':
        return '⚔️';
      case 'community':
        return '🏰';
      case 'system':
        return '📜';
      default:
        return '📢';
    }
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Notification Bell Icon */}
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-full bg-customContentBg border border-customSecondary 
                 hover:bg-customSecondary hover:text-customBg transition-all duration-200
                 shadow-customBlockShadow hover:shadow-customBlockShadowHover
                 group"
        aria-label="Notifications"
      >
        {/* Fantasy Bell Icon */}
        <div className="relative">
          <svg
            className="w-6 h-6 text-customHeaderTwo group-hover:text-customBg transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5v-5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17h6m-6 0v-5a3 3 0 013-3h0a3 3 0 013 3v5m-6 0h6"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2v2m0 0v2m0-2h2m-2 0H8"
            />
          </svg>

          {/* Notification Badge */}
          {notifications.length > 0 && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
                          rounded-full flex items-center justify-center font-bold
                          animate-pulse"
            >
              {notifications.length > 9 ? '9+' : notifications.length}
            </div>
          )}
        </div>
      </button>

      {/* Notification Popup */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-hidden
                      bg-customContentBg border border-customSecondary rounded-lg
                      shadow-customBlockShadow z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-customSecondary bg-gradient-to-r from-customSecondary/10 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-customHeaderTwo font-semibold text-lg">
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-customTxtContent hover:text-customSecondary transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-customTxtContent">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-customSecondary mx-auto"></div>
                <p className="mt-2">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-customTxtContent">
                <div className="text-4xl mb-2">📭</div>
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-customSecondary/20">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-customSecondary/5 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-customHeaderTwo font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-customTxtContent/60 flex-shrink-0 ml-2">
                            {formatNotificationTime(
                              notification.created_at.seconds
                            )}
                          </span>
                        </div>
                        <p className="text-customTxtContent text-sm leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-customSecondary/20 bg-gradient-to-r from-transparent to-customSecondary/5">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-customSecondary hover:text-customHeaderTwo 
                         transition-colors duration-200 text-sm font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
