import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../BackToTop';
import Script from 'next/script';

// Add type declaration for Tawk_API
declare global {
  interface Window {
    Tawk_API?: {
      onLoad: () => void;
      onChatMaximized: () => void;
      onChatMinimized: () => void;
      onChatHidden: () => void;
      onChatStatusChanged: (status: string) => void;
      onPrechatSubmit: (data: any) => void;
      onChatMessage: (message: any) => void;
      onChatEnded: () => void;
      onError: (error: Error) => void;
      onFileUpload: (file: File) => void;
      onPageLoad: () => void;
      onVisitorInfo: (visitor: any) => void;
      setAttributes: (attributes: any) => void;
      getAttributes: () => any;
      addEvent: (eventName: string, data: any) => void;
      sendMessage: (message: string) => void;
      customStyle: any;
      showWidget: () => void;
      hideWidget: () => void;
      toggleVisibility: () => void;
      isVisitorEngaged: () => boolean;
      toggle: () => void;
    };
  }
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Tawk.to
    const initTawkTo = () => {
      console.log('Initializing Tawk.to...');
      
      if (typeof window === 'undefined') {
        console.log('Window is undefined, skipping initialization');
        return;
      }

      // Initialize Tawk_API if it doesn't exist
      if (!window.Tawk_API) {
        console.log('Tawk_API not found, initializing...');
        window.Tawk_API = {
          onLoad: () => {},
          onChatMaximized: () => {},
          onChatMinimized: () => {},
          onChatHidden: () => {},
          onChatStatusChanged: () => {},
          onPrechatSubmit: () => {},
          onChatMessage: () => {},
          onChatEnded: () => {},
          onError: () => {},
          onFileUpload: () => {},
          onPageLoad: () => {},
          onVisitorInfo: () => {},
          setAttributes: () => {},
          getAttributes: () => ({}),
          addEvent: () => {},
          sendMessage: () => {},
          customStyle: {},
          showWidget: () => {},
          hideWidget: () => {},
          toggleVisibility: () => {},
          isVisitorEngaged: () => false,
          toggle: () => {}
        };
      }

      const tawkApi = window.Tawk_API;
      if (!tawkApi) return;
      
      tawkApi.onLoad = function() {
        console.log('Tawk.to loaded successfully');
        
        try {
          tawkApi.setAttributes({
            name: 'Aryawn Legal Assistant',
            email: 'tickets@haryaw.p.tawk.email',
            role: 'default',
            department: 'Legal Services',
            apiKey: '97642ecb4b509d00358619cdb5e7c451c97cb26a',
            secure: true,
            sessionId: Date.now().toString(36) + Math.random().toString(36).substr(2)
          });

          tawkApi.customStyle = {
            visibility: {
              position: 'br',
              xOffset: '30px',
              yOffset: '30px'
            },
            chatWindow: {
              color: '#1a365d',
              backgroundColor: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            },
            chatButton: {
              color: '#ffffff',
              backgroundColor: '#1a365d',
              borderRadius: '50%',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease'
            },
            header: {
              backgroundColor: '#1a365d',
              color: '#ffffff',
              padding: '12px 16px'
            }
          };

          // Force show the widget
          console.log('Attempting to show widget...');
          tawkApi.showWidget();
          
          // Backup show attempt
          setTimeout(() => {
            console.log('Backup show attempt...');
            tawkApi.showWidget();
          }, 2000);

          tawkApi.onChatMaximized = function() {
            console.log('Chat maximized');
            setTimeout(function() {
              tawkApi.sendMessage('Welcome to Aryawn Legal Services! 👋\\n\\nI\'m here to help you with:\\n• Legal consultations\\n• Case inquiries\\n• Appointment scheduling\\n\\nHow may I assist you today?');
            }, 1000);
          };

          tawkApi.onChatStatusChanged = function(status) {
            console.log('Chat status changed:', status);
            if (status === 'online') {
              tawkApi.sendMessage('A legal expert is now available to assist you.');
            } else if (status === 'offline') {
              tawkApi.sendMessage('Our team is currently offline. Please leave a message and we\'ll get back to you during business hours.');
            }
          };

          if (Notification.permission === 'default') {
            Notification.requestPermission();
          }
        } catch (error) {
          console.error('Error in Tawk.to initialization:', error);
        }
      };

      tawkApi.onError = function(error) {
        console.error('Tawk.to error:', error);
      };
    };

    // Initial attempt
    initTawkTo();

    // Backup initialization check
    const checkTawkTo = setInterval(() => {
      console.log('Checking for Tawk_API...');
      if (typeof window !== 'undefined' && window.Tawk_API) {
        console.log('Tawk_API found, initializing...');
        initTawkTo();
        clearInterval(checkTawkTo);
      }
    }, 2000);

    return () => clearInterval(checkTawkTo);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <Script
        id="tawkto"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error loading Tawk.to script:', e);
        }}
        onLoad={() => {
          console.log('Tawk.to script loaded successfully');
          if (typeof window !== 'undefined' && window.Tawk_API) {
            window.Tawk_API.onLoad();
          }
        }}
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/682e538495bd451910021831/1irqfcftq';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `
        }}
      />
    </div>
  );
};

export default Layout;