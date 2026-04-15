import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AdminContext } from '../contexts/AdminContext';
import './VideoCallPage.css';

export default function VideoCallPage() {
  const { user } = useContext(AuthContext);
  const { adminUser } = useContext(AdminContext);
  const currentUser = user || adminUser;
  const userId = user?.uid || adminUser?.id || 'user';

  const [roomName, setRoomName] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [generatedRoomName, setGeneratedRoomName] = useState('');

  const iframeRef = useRef(null);

  const generateRoomName = () => {
    const name = roomName.trim()
      ? roomName.trim()
      : `nexora-call-${userId.substring(0, 8)}-${Math.random().toString(36).substring(2, 10)}`;

    setGeneratedRoomName(name);
    setIsInCall(true);
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/dashboard?room=${generatedRoomName}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('✅ Room link copied! Share this with the admin / client.');
    });
  };

  const endCall = () => {
    setIsInCall(false);
    setGeneratedRoomName('');
    setRoomName('');
  };

  if (!currentUser) {
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
          <h1>📹 Video Call</h1>
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
              Leave empty for a random room or enter a name to share with the other person.
            </p>
          </div>
        </div>
      ) : (
        <div className="call-active">
          <div className="call-header">
            <h2>Room: {generatedRoomName}</h2>
            <div>
              <button onClick={copyRoomLink} className="copy-btn">📋 Copy Link</button>
              <button onClick={endCall} className="end-call-btn">End Call</button>
            </div>
          </div>

          <div className="jitsi-iframe-wrapper">
            <iframe
              ref={iframeRef}
              src={`https://meet.jit.si/${generatedRoomName}#userInfo.displayName=${encodeURIComponent(
                currentUser.displayName || currentUser.name || 'User'
              )}&config.startWithAudioMuted=false&config.startWithVideoMuted=false`}
              allow="camera; microphone; fullscreen; display-capture"
              style={{
                width: '100%',
                height: 'calc(100vh - 180px)',
                border: 'none',
                borderRadius: '8px',
                background: '#000',
              }}
              title="Video Call"
            />
          </div>
        </div>
      )}
    </div>
  );
}