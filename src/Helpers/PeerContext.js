// PeerContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import Peer from 'peerjs';

// Create a context for the PeerJS instance
const PeerContext = createContext();

// Custom hook to access the PeerContext
export const usePeer = () => {
  return useContext(PeerContext);
};

// PeerProvider component to wrap your application with the context
export const PeerProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    // Initialize PeerJS when the component mounts
    const initializePeer = async () => {
      console.log('initializePeer');
      let newPeer;
      let qs = new URLSearchParams(window.location.search);
      if(localStorage.getItem('broadcast')) {
        newPeer = new Peer(localStorage.getItem('broadcast'));
      } else {
        newPeer = new Peer();
      }
       // You can pass configuration options here if needed

      newPeer.on('open', () => {
        console.log('PeerJS connection open. ID:', newPeer.id);
      });

      newPeer.on('connection', (conn) => {
        conn.on('data',(data) => {
            console.log('data',data);
        })
      })

      newPeer.on('call', (incoming) => {
        console.log('incoming call');
        incoming.answer(window.mediaStream.localAudioStream);
      })

      newPeer.on('error', (err) => {
        console.error('PeerJS error:', err);
      });
      
      newPeer.on('disconnect', () => {
        console.log('reconnecting');
        newPeer.reconnect();
      }); 

      setPeer(newPeer);

      // Cleanup on component unmount
      return () => {
        newPeer.destroy();
        console.log('PeerJS connection closed.');
      };
    };

    initializePeer();
  }, []);

  return (
    <PeerContext.Provider value={peer}>
      {children}
    </PeerContext.Provider>
  );
};
