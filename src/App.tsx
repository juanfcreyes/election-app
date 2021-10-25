import { useContext } from 'react';
import { SocketContext } from './context/socket-context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import Fritada from './assets/img/1.jpg';
import Encebollado from './assets/img/2.jpg';
import Hornado from './assets/img/3.jpg';
 

const data = [
  {
    id: 0,
    title: 'Fritada',
    src: Fritada
  },
  {
    id: 1,
    title: 'Encebollado',
    src: Encebollado
  },
  {

    id: 2,
    title: 'Hornado',
    src: Hornado
  }
];

const App = () => {

  const { emit } = useContext(SocketContext);

  const onClick = (id: number) => (_ : any) => {
    emit("election", id);
  }

  return (
    <Container >
      <Row className='center'>
        {data.map((item: any) => [
          <Col key={item} md={3} xs={12} className='m-2'>
            <Card className='p-4' >
              <Card.Img variant="top" src={item.src} />
              <Card.Body className='text-center'>
                <Card.Title>{item.title}</Card.Title>
                <Button variant="outline-dark" onClick={onClick(item.id)}>Vote me</Button>
              </Card.Body>
            </Card>
          </Col>
        ])}
      </Row>
    </Container >
  );
}

export default App;
