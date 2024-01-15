import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function MessagesList() {
  // get user data from context
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  // get request to /messages/:userId
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/messages/${user.id}`)
        .then(response => {
          // store messages in state
          setMessages(response.data);
        })
        .catch(error => {
          console.log('Error fetching message data:', error);
        });
    }
  }, [user]);

  return (
    <>
      <Container className='mt-5'>
        <h2 className='text-center mb-5'>Your Messages</h2>
        {messages.map(message => {
          return (
            <Link
              to={`/messages/${message.sender_id}/${message.receiver_id}`}
              key={message.id}
            >
              <Row>
                <Alert>
                  <div className='d-flex flex-row align-items-center mb-3'>
                    <img
                      src={
                        message.receiver_id === user.id ?
                          message.sender_image :
                          message.receiver_image
                      }
                      alt={`User ${message.receiver_id === user.id ?
                        message.sender_id :
                        message.receiver_id
                        }`}
                      width="80"
                      className="rounded-circle me-4"
                    />
                    <p><strong>{message.receiver_username}</strong></p>
                  </div>
                  <p>{message.message_text}</p>
                </Alert>
              </Row>
            </Link>
          );
        })}
      </Container>
    </>
  );
}