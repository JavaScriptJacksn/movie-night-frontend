import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../assets/upload.png";

import styles from "../styles/MovieCreateEditForm.module.css";
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";
import Asset from "../components/Asset";
import { FormControl, FormGroup, FormLabel, Image } from "react-bootstrap";


function MovieCreateForm() {

  const [errors, setErrors] = useState({});
  const [movieData, setMovieData] = useState(
    {
      title : "",
      plot : "",
      runtime : null,
      poster: "",
    }
  );

  const {title, plot, runtime, poster} = movieData;

  const handleChange = (event) => {
    setMovieData({
      ...movieData,
      [event.target.name] : event.target.value,
    })
  }

  const handleChangeImage = (event) => {
    URL.revokeObjectURL(poster)
    if (event.target.files.length) {
      setMovieData({
        ...movieData,
        poster : URL.createObjectURL(event.target.files[0]),
      })
    }
  }


  const textFields = (
    <div className="text-center">
      <FormGroup>
        <FormLabel>Title</FormLabel>
        <FormControl 
        type="text" 
        name="title"
        value={title}
        onChange={handleChange}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormLabel>Plot</FormLabel>
        <FormControl 
        as="textarea" 
        rows={6} 
        name="plot"
        value={plot}
        onChange={handleChange}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormLabel>Runtime</FormLabel>
        <FormControl 
        type="number" 
        name="runtime"
        value={runtime}
        ></FormControl>
      </FormGroup>

    
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">

              {poster ? (
                <>
                <figure>
                  <Image className={appStyles.Image} src={poster} rounded />
                </figure>
                <div>
                  <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor="image-upload"
                    >
                      Change the image
                  </Form.Label>
                </div>
                </>
              ) : (
                  <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click or tap to upload an image"/>
                </Form.Label>
              )}
            

                <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage}/>

            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default MovieCreateForm;