import { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  Button
} from 'react-bootstrap';
import axios from 'axios';

export default function Messages() {
  // get user data from context
  const { user, updateNewMessageCount } = useContext(UserContext);
  // get url
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const userId = pathSegments[pathSegments.length - 2];
  const otherUserId = pathSegments[pathSegments.length - 1];
  // app state
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // get request to /messages/:userId/:otherUserId on page load
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/messages/${userId}/${otherUserId}`)
        .then(response => {
          setMessages(response.data);
          updateNewMessageCount(0);
        })
        .catch(error => {
          console.log('Error fetching message data:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  // go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  // handle form submission
  const handleTextAreachange = (e) => {
    setMessageText(e.target.value);
  };

  // submit new message
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/api/messages/${userId}/${otherUserId}`,
        { messageText },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      .then(() => {
        setMessageText('');
        // after successful post request, get all messages
        return axios.get(`http://localhost:8080/messages/${userId}/${otherUserId}`);
      })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error("Error during registration:", error.message);
      });
  };

  return (
    <>
      {/* list of messages from messages state */}
      <Container className='mt-5 messageContainer'>
        {messages.map(message => {
          return (
            <Row
              className={`
                ${user.id === message.receiver_id ?
                  'justify-content-start' :
                  'justify-content-end'
                }
                d-flex 
                mb-5
              `}
              key={message.id}
            >
              <Col
                md='auto'
                className={user.id === message.receiver_id ?
                  'order-first' :
                  'order-last'
                }
              >
                <img
                  src={message.sender_image}
                  className={`rounded-circle`}
                  width="80"
                />
              </Col>
              <Col md='auto'>
                <Alert variant={user.id === message.receiver_id ? 'info' : 'success'}>
                  {message.message_text}
                </Alert>
              </Col>
            </Row>
          );
        })}
      </Container>
      {/* message input */}
      <Container className='fixed-bottom p-3 bg-white'>
        <Link to={`http://localhost:5173/messages/${userId}`}>
          <Button className='mb-2' size='sm'>
            Back to messages
          </Button>
        </Link>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="messageInput">
                <Form.Control
                  as='textarea'
                  rows={1}
                  placeholder='Type your message...'
                  onChange={handleTextAreachange}
                  value={messageText}
                />
              </Form.Group>
            </Col>
            <Col md='1'>
              <Button
                variant='primary'
                type='submit'
                className='w-100'
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </Container >
    </>
  );
}