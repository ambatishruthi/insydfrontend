import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://insydbackend-1.onrender.com/api/notifications');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>Loading notifications...</div>;
  }

  if (error) {
    return <div style={{ fontFamily: 'sans-serif', padding: '20px', color: 'red' }}>Error: {error.message}</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Insyd Notifications</h1>
      <p style={{ fontStyle: 'italic' }}>Real-time updates on likes, comments, and follows.</p>

      {notifications.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px'
              }}
            >
              <h3 style={{ margin: '0 0 5px 0' }}>{notification.type}</h3>
              <p style={{ margin: '0 0 10px 0' }}>{notification.content}</p>
              <small style={{ color: '#666' }}>
                {notification.timestamp
                  ? new Date(notification.timestamp).toLocaleString()
                  : "No date"}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
}

export default App;
