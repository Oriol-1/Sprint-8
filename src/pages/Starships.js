import React, { useState, useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';
import Layout from '../../components/Header/Layout';
import Head from 'next/head';
import { Container, ListGroup, Card, Spinner, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
// importar footer


const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const { usuario } = useContext(FirebaseContext);
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      router.push('/');
    }
  }, [router, usuario]);

  const fetchStarships = useCallback(async (page) => {
    try {
      setLoading(true);

      if (!hasMoreData) {
        setLoading(false);
        return;
      }

      const response = await fetch(`https://www.swapi.tech/api/starships?page=${page}`);
      if (response.status === 404) {
        setHasMoreData(false);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setHasMoreData(false);
        setLoading(false);
        return;
      }

      setStarships((prevStarships) => [...prevStarships, ...data.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [hasMoreData]);


  useEffect(() => {
    if (!usuario) {
      router.push('/registro');
    }
  }, [router, usuario]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchStarships(currentPage);
  }, [fetchStarships, currentPage]);

  return (
    <Layout>
      <Head>
        <title>Star Wars Ships</title>
      </Head>
      <Container>
        <h1 className="text-center my-4">Star Wars Ships</h1>
        <ListGroup style={{ maxWidth: '500px', margin: '0 auto' }}>
          {starships.map((starship, index) => (
            <div className=' mt-3 ' key={index}>
              <Card.Body className='content-wrapper'>
                <Link href={`/starships/starships?name=${starship.name}`}>
                  <Card.Title>{starship.name}</Card.Title>
                  <Card.Text className="model-info">
                    <strong>Model:</strong> {starship.name}
                  </Card.Text>
                </Link>
              </Card.Body>
            </div>
          ))}
        </ListGroup>
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" />
          </div>
        )}
        {!loading && hasMoreData && (
          <div className="text-center my-4 mb-5 pb-5">
            <Button className="load-more-button" onClick={handleLoadMore}>
              Mas naves
            </Button>
          </div>
        )}
      </Container>


      




    </Layout>
  );
};

export default Starships;

