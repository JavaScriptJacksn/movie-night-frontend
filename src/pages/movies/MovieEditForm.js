import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/MovieCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { FormControl, FormGroup, FormLabel, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import {axiosReq} from "../../api/axiosDefaults";

function MovieEditForm() {

  const [errors, setErrors] = useState({});
  const [movieData, setMovieData] = useState(
    {
      title : "",
      plot : "",
      runtime : "",
      rated : "",
      year : "",
      poster: "",
    }
  );

  const {title, plot, runtime, rated, year, poster} = movieData;

  const posterInput = useRef(null)
  const history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
        try {
            const { data} = await axiosReq.get(`/movies/${id}`)
            const {title, plot, runtime, rated, year, poster, is_editor} = data;

            is_editor ? setMovieData({title, plot, runtime, rated, year, poster}) : history.push("/");
        } catch(err){
            console.log(err)
        }
    }

    handleMount();
  }, [history, id])

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('title', title)
    formData.append('plot', plot)
    formData.append('runtime', runtime)
    formData.append('rated', rated)
    formData.append('year', year)

    if (posterInput?.current?.files[0]){
        formData.append('poster', posterInput.current.files[0])
    }
    
    try {
      await axiosReq.put(`/movies/${id}`, formData)
      history.push(`/movies/${id}`)
    } catch (err){
      console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.plot?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <FormGroup>
        <FormLabel>Runtime</FormLabel>
        <FormControl 
        type="number" 
        name="runtime"
        value={runtime}
        onChange={handleChange}
        ></FormControl>
      </FormGroup>
      {errors?.runtime?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <FormGroup>
        <FormLabel>Year</FormLabel>
        <FormControl 
        type="number" 
        name="year"
        value={year}
        onChange={handleChange}
        ></FormControl>
      </FormGroup>

      {errors?.year?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <FormGroup>
        <FormLabel>Rated</FormLabel>
        <FormControl
        as="select"
        name="rated"
        value={rated}
        onChange={handleChange}
        >
        <option value="UNRATED">UNRATED</option>
        <option value="TV-PG">TV-PG</option>
        <option value="TV-G">TV-G</option>
        <option value="TV-R">TV-R</option>
        <option value="TV-X">TV-X</option>
        </FormControl>
      </FormGroup>

      {errors?.rated?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
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
            

                <Form.File 
                id="image-upload" 
                accept="image/*" 
                onChange={handleChangeImage}
                ref={posterInput}
                />

            </Form.Group>
            {errors?.poster?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}


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

export default MovieEditForm;