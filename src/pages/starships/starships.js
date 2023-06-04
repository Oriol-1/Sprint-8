import React from "react";
import { useState, useEffect, Suspense } from "react"; 
import { useRouter } from "next/router";
import Layout from "../../../components/Header/Layout"; // Importar componente Layout
import Head from "next/head"; // Importar componente Head para manejar elementos de encabezado HTML
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import PilotCard from "../../../components/pilotCard/PilotCard"; // Importar componente PilotCard
import MovieCard from "../../../components/movieCard/MovieCard"; // Importar componente MovieCard
import { moviePosters } from "../moviePosters/moviePosters"; // Importar objeto moviePosters

const Starship = () => {
  const router = useRouter(); // Obtener objeto para gestionar la ruta actual
  const [starship, setStarship] = useState(null); // Estado para almacenar los datos de la nave espacial
  const [imageURL, setImageURL] = useState(null); // Estado para almacenar la URL de la imagen de la nave espacial
  const [imageLoaded, setImageLoaded] = useState(false); // Estado para controlar si la imagen ha sido cargada o no
  const [loading, setLoading] = useState(true); // Estado para controlar si se está cargando la información

  const [movies, setMovies] = useState([]); // Estado para almacenar las películas relacionadas con la nave espacial
  const [actorMovies, setActorMovies] = useState([]); // Estado para almacenar las películas en las que actúan los pilotos

  useEffect(() => {
    const fetchStarship = async () => {
      const { name } = router.query; // Obtener el parámetro de la ruta actual
      try {
        const response = await fetch(
          `https://swapi.py4e.com/api/starships/?search=${name}`
        ); // Realizar una solicitud para obtener los datos de la nave espacial
        const data = await response.json(); // Convertir la respuesta en formato JSON
        setStarship(data.results[0]); // Actualizar el estado con los datos de la nave espacial
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Finalizar el proceso de carga
      }
    };

    fetchStarship(); // Llamar a la función de carga de datos de la nave espacial al cargar el componente
  }, [router.query]);

  useEffect(() => {
    if (starship) {
      const starshipID = starship.url.match(/\/(\d+)\/$/)[1]; // Extraer el ID de la nave espacial desde la URL
      const imageURL = `https://starwars-visualguide.com/assets/img/starships/${starshipID}.jpg`; // Construir la URL de la imagen
      const img = new Image();
      img.onload = () => setImageURL(imageURL); // Actualizar el estado con la URL de la imagen cargada correctamente
      img.onerror = () => {
        setImageURL(getFallbackImage(starship.name)); // Obtener una imagen alternativa en caso de error
      };
      img.src = imageURL; // Cargar la imagen

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [starship]);

  const getFallbackImage = (starshipName) => {
    const customImages = {
      "CR90 corvette": "/CR90.jpg",
      "Star Destroyer": "/Star-Destroyer.jpg",
      "Rebel transport": "/GR75.png",
    };

    return customImages[starshipName] || "/logo.png"; // Devolver una imagen de fallback si el nombre de la nave no coincide
  };

  const [pilotData, setPilotData] = useState([]); // Estado para almacenar los datos de los pilotos

  useEffect(() => {
    const fetchPilots = async () => {
      if (starship && starship.pilots.length > 0) {
        const promises = starship.pilots.map(async (pilotURL) => {
          const response = await fetch(pilotURL); // Obtener los datos del piloto
          const data = await response.json(); // Convertir la respuesta en formato JSON
          const pilotFilms = actorMovies.find((actorMovies) =>
            actorMovies.some((movie) => movie.characters.includes(data.url))
          ); // Encontrar las películas en las que actúa el piloto
          return {
            name: data.name,
            image: `https://starwars-visualguide.com/assets/img/characters/${data.url.match(
              /\/(\d+)\/$/
            )[1]}.jpg`,
            films: pilotFilms,
          };
        });
        const pilotData = await Promise.all(promises); // Esperar a que todas las solicitudes se resuelvan
        setPilotData(pilotData); // Actualizar el estado con los datos de los pilotos
      }
    };
    fetchPilots(); // Llamar a la función de carga de datos de los pilotos al cargar el componente
  }, [starship, actorMovies]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://swapi.py4e.com/api/films/'); // Obtener los datos de las películas
        const data = await response.json(); // Convertir la respuesta en formato JSON
        if (starship) {
          setMovies(
            data.results.filter((movie) => movie.starships.includes(starship.url))
          ); // Filtrar las películas que contienen la URL de la nave espacial
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies(); // Llamar a la función de carga de datos de las películas al cargar el componente
  }, [starship]);

  const [movieImages, setMovieImages] = useState([]); // Estado para almacenar las imágenes de las películas

  useEffect(() => {
    const fetchMovieImages = async () => {
      if (starship) {
        const moviePromises = movies.map((movie) => {
          const movieId = movie.url.match(/\/(\d+)\/$/)[1]; // Extraer el ID de la película desde la URL
          return fetch(`https://swapi.py4e.com/api/films/${movieId}/`).then((response) => response.json());
        });
        const movieData = await Promise.all(moviePromises); // Esperar a que todas las solicitudes se resuelvan
        const movieImages = movieData.map((movie) => ({
          title: movie.title,
          image: `/poster/${moviePosters[movie.title]}`, // Obtener la URL de la imagen de la película desde el objeto moviePosters
        }));
        setMovieImages(movieImages); // Actualizar el estado con las imágenes de las películas
      }
    };
    fetchMovieImages(); // Llamar a la función de carga de imágenes de las películas al cargar el componente
  }, [starship, movies]);
  return (
    <div>
      <Layout>
        <Head>
          <title>{`${starship ? starship.name : 'Loading...'} - Star Wars Starships`}</title>
        </Head>
        <Container>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Row className="mt-3">
                <Col>
                  <h1>{starship && starship.name}</h1>
                  <p>{starship && starship.model}</p>
                </Col>
              </Row>
              <Row className="mt-3 align-items-end">
                <Col md={6}>
                  <Suspense fallback={<div>Loading image...</div>}>
                    <span>
                      <Card.Img
                        src={imageURL}
                        alt={starship && starship.name}
                        onLoad={() => setImageLoaded(true)}
                        style={{
                          display: imageLoaded ? 'block' : 'none',
                          background: '#424242',
                        }}
                      />
                    </span>
                  </Suspense>
                </Col>
                <Col md={6}>
                  <h2>Specs</h2>
                  <p>{starship && starship.length} metros</p>
                  <ListGroup>
                    <ListGroup.Item >
                      Manufacturer: {starship && starship.manufacturer}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Cost in credits: {starship && starship.cost_in_credits}
                    </ListGroup.Item>
                    <ListGroup.Item>Length: {starship && starship.length}</ListGroup.Item>
                    <ListGroup.Item>Max atmosphering speed: {starship && starship.max_atmosphering_speed}</ListGroup.Item>
                    <ListGroup.Item>Crew: {starship && starship.crew}</ListGroup.Item>
                    <ListGroup.Item>Passengers: {starship && starship.passengers}</ListGroup.Item>
                    <ListGroup.Item>Cargo capacity: {starship && starship.cargo_capacity}</ListGroup.Item>
                    <ListGroup.Item>Consumables: {starship && starship.consumables}</ListGroup.Item>
                    <ListGroup.Item>Hyperdrive rating: {starship && starship.hyperdrive_rating}</ListGroup.Item>
                    <ListGroup.Item>MGLT: {starship && starship.MGLT}</ListGroup.Item>
                    <ListGroup.Item>Starship class: {starship && starship.starship_class}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              

              {pilotData.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-0">Pilots:</h3>
                  <Row className="mb-4">
                    {pilotData.map((pilot, index) => (
                      <Col key={index} md={4} className="mt-3">
                        <PilotCard name={pilot.name} image={pilot.image} />
                        {pilot.films && pilot.films.map((movie, movieIndex) => (
                          <div key={movieIndex} movie={movie} />
                        ))}
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {movies.length > 0 && (
                <div className=" mb-5 pb-5 ">
                  <br></br>


                  {movieImages.length > 0 && (
                    <div className="mb-5 pb-5">
                      <h3 className="mb-0">Star Wars Movies:</h3>
                      <div className="row">
                        {movies.map((movie, index) => (
                          <Col key={index} md={4} className="mt-3">
                            <div className="card img-peli">
                              <Card.Img
                                src={`/poster/${moviePosters[movie.title]}`}
                                alt={movie.title}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                }}
                              />
                              <Card.Body>
                                <Card.Title className="mb-0 movie-title">{movie.title}</Card.Title>
                                <MovieCard movie={movie} />
                              </Card.Body>
                            </div>
                          </Col>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </>
          )}
        </Container>
      </Layout>
    </div>
  );

};

export default Starship;
