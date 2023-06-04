import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Header/Layout';
import Head from 'next/head';

import { Container} from 'react-bootstrap';

export default function Index() {

  return (
    <>
     <Layout>
      <Head>
        <title>Star Wars Ships</title>
      </Head>
      <Container>
{/* yaa */}

<div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
    <picture>
      <img src="/slider-1.jpg" className="d-block w-100" alt="..."></img>
      </picture>
      <div className="carousel-caption d-md-block">
     
        <div className="d-grid gap-2 col-6 mx-auto ">

   <Link className="btn boton"  href='/Starships'>Starships</Link>

        </div>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <picture>
      <img src="/slider-2.jpg" className="d-block w-100" alt="..."></img>
      </picture>

       <div className="carousel-caption d-md-block">
     
     <div className="d-grid gap-2 col-6 mx-auto ">

<Link className="btn boton"  href='/Starships'>Starships</Link>

     </div>
   </div>
    </div>
    <div className="carousel-item">
    <picture>
      <img src="/slider-3.jpg" className="d-block w-100" alt="..."></img>
      </picture>
      <div className="carousel-caption d-md-block">
     
     <div className="d-grid gap-2 col-6 mx-auto ">

<Link className="btn boton"  href='/Starships'>Starships</Link>

     </div>
   </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


        <h1 className="text-center my-4 pb-5 mb-4">Star Wars </h1>
        <br></br>
    
      </Container>
    </Layout>
    </>
  )
}
