import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './VideoCallPage.css';

export default function VideoCallPage() {
  const { user } = useContext(AuthContext);
  const [roomName, setRoomName] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [generatedRoomName, setGeneratedRoomName] = useState('');

  useEffect(() => {
    // Load Jitsi Meet API script
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = 'https://meet.jitsi.com/external_api.js';
      document.head.appendChild(script);
    }
  }, []);

  const generateRoomName = () => {
    // Generate a unique room name
    const name =
      roomName.trim() ||
      `call-${user?.uid?.substring(0, 6)}-${Math.random().toString(36).substring(7)}`;
    setGeneratedRoomName(name);
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    setGeneratedRoomName('');
    setRoomName('');
  };

  if (!user) {
    return (
      <div className="video-call-container">
        <p>Please log in to start a video call</p>
      </div>
    );
  }

  return (
    <div className="video-call-container">
      {!isInCall ? (
        <div className="call-setup">
          <h1>Video Call</h1>
          <div className="setup-form">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name (optional)"
              className="room-input"
            />
            <button onClick={generateRoomName} className="start-call-btn">
              Start Video Call
            </button>
            <p className="help-text">
              Leave empty to generate a random room, or enter a specific room name to share with
              others
            </p>
          </div>

          <div className="call-info">
            <h2>How it works:</h2>
            <ul>
              <li>Enter a room name or leave empty for a random one</li>
              <li>Share the room name with others to join your call</li>
              <li>No signup needed - it's completely free</li>
              <li>Supports audio, video, and screen sharing</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="call-active">
          <div className="call-header">
            <h2>Room: {generatedRoomName}</h2>
            <button onClick={endCall} className="end-call-btn">
              End Call
            </button>
          </div>
          <JitsiMeetComponent roomName={generatedRoomName} userName={user.displayName || 'User'} />
        </div>
      )}
    </div>
  );
}

function JitsiMeetComponent({ roomName, userName }) {
  const containerRef = useState(null)[1];

  useEffect(() => {
    const container = document.getElementById('jitsi-meet-container');
    if (!container || !window.JitsiMeetExternalAPI) return;

    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: container,
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
      },
      interfaceConfigOverwrite: {
        HIDE_INVITE_MORE_HEADER: true,
      },
      userInfo: {
        displayName: userName,
      },
    };

    const api = new window.JitsiMeetExternalAPI('meet.jitsi.com', options);

    return () => {
      api.dispose();
    };
  }, [roomName, userName]);

  return <div id="jitsi-meet-container" className="jitsi-container" />;
}
