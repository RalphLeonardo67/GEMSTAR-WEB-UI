import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { uploadCarousel, getAllCarousels, updateCarouselStatus, deleteCarousel } from '../../../../store/action';

import Swal from 'sweetalert2'

const Carousel = props => {
  const { uploadCarousel, getAllCarousels, updateCarouselStatus, deleteCarousel,carousels } = props;
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    caption: '',
  });

  const [file, setFile] = useState({
    filename: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  useEffect(() => {
    getAllCarousels();
  }, []);

  const handleFileUpload = e => {
    const files = e.target.files[0];
    
    setFile({
      filename: files,
    });
  };

  const deleteCarouselData = (id,filename) => {
    Swal.fire({
      title: 'Are you sure you want to delete this file?',
      text: `${filename}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const carousel_id = id;
        deleteCarousel(carousel_id).then(res => {
          if (res.success) {
            toast.success(`Your file ${filename} has been deleted.`, {
              position: toast.POSITION.TOP_CENTER
            });
            getAllCarousels();
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_CENTER
            });
          }
        });
      }
    })
   
  }

  const handleActive = (id, status, filename) => {
    Swal.fire({
      title: 'Are you sure you want to activate this file?',
      text: `${filename}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const carousel_id = id;
        const is_inactive = status;
        updateCarouselStatus(carousel_id,is_inactive).then(res => {
          if (res.success) {
            toast.success(`Successfully Active Carousel with a filename of ${filename}`, {
              position: toast.POSITION.TOP_CENTER
            });
            getAllCarousels();
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_CENTER
            });
          }
        });
      }
    })
  }

  const handleInActive = (id, status, filename)=> {
    Swal.fire({
      title: 'Are you sure you want to deactivate this file?',
      text: `${filename}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const carousel_id = id;
        const is_inactive = status;
        updateCarouselStatus(carousel_id,is_inactive).then(res => {
          if (res.success) {
            toast.success(`Successfully Deactive Carousel with a filename of ${filename}`, {
              position: toast.POSITION.TOP_CENTER
            });
            getAllCarousels();
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_CENTER
            });
          }
        });
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('filename', file.filename)
    formData.append('caption', values.caption)
    uploadCarousel(formData).then(res => {
      console.log("hotdog",res)
      if (res.success) {
        toast.success('Successfully Add Carousel Photo', {
          position: toast.POSITION.TOP_CENTER
        });
        getAllCarousels();
        setValues({
          caption: ''
        });

        setFile({
          filename: ''
        })

        setShow(false);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control
                type="file"
                name="filename"
                // value={file.filename}
                onChange={handleFileUpload}
                multiple
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicCaption">
              <Form.Label className="mb-0">Caption:</Form.Label>
              <Form.Control
                type="text"
                name="caption"
                value={values.caption}
                onChange={handleChange}
                placeholder="Enter caption for this image"
              />
            </Form.Group>

            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div class="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShow(true)}>
          Add Photo
        </Button>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Caption</th>
            <th>Image</th>
            <th>Filename</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carousels.length > 0 && carousels.map(carousel => {
            return (
              <tr key={carousel.carousel_id}>
                <td>{carousel.caption}</td>
                <td>
                  <Image
                    src={carousel.file_destination}
                    thumbnail
                    style={{ maxWidth: '8rem' }}
                  />
                </td>
                <td>{carousel.file_name}</td>
                <td>{carousel.is_inactive == 1 ? 'Active' : 'Inactive'}</td>
                <td>
                  {carousel.is_inactive == 1 ? <Button variant="warn" onClick={() => handleInActive(carousel.carousel_id,0,carousel.file_name)}>Deactive</Button> : <Button variant="done" onClick={() => handleActive(carousel.carousel_id,1,carousel.file_name)}>Activate</Button>}
                  <Button variant="cancel" onClick={() => deleteCarouselData(carousel.carousel_id, carousel.file_name)}>Delete</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.app.isAuthenticated,
    carousels: state.carousels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadCarousel: props => dispatch(uploadCarousel(props)),
    updateCarouselStatus: (carousel_id, is_inactive) => dispatch(updateCarouselStatus(carousel_id, is_inactive)),
    deleteCarousel: carousel_id => dispatch(deleteCarousel(carousel_id)),
    getAllCarousels: () => dispatch(getAllCarousels())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
