import { carouselActionType } from '../../constants/actionType';
import { axiosInstance } from '../../util/axios';

export const uploadCarousel = carouselData => (dispatch /* , getState */) => {
  return axiosInstance('post', '/app/carousel-upload', carouselData)
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({ type: carouselActionType.MERGE_CAROUSEL, data: res.data });
      }

      return res;
    })
    .catch(err => {
      return err.response.data;
    })
};

export const getAllCarousels = () => (dispatch, getState) => {
  return axiosInstance('get', '/app/carousels')
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({ type: carouselActionType.MERGE_CAROUSEL, data: res.data });
      }
    });
};

export const getAllActiveCarousels = () => (dispatch, getState) => {
  return axiosInstance('get', '/app/active-carousels')
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({ type: carouselActionType.MERGE_CAROUSEL, data: res.data });
      }
    });
};

export const updateCarouselStatus = (carousel_id, is_inactive) => (dispatch /* getState */) => {
  dispatch({
    type: carouselActionType.RESET_CAROUSEL_DATA
  });
  const carouselData = {
    carousel_id,
    is_inactive
  }
  return axiosInstance('put', `/app/update-carousel`,carouselData)
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({
          type: carouselActionType.MERGE_CAROUSEL_DATA,
          data: res.data
        });
      }

      return res;
    });
};

export const deleteCarousel = (carousel_id) => (dispatch /* getState */) => {
  dispatch({
    type: carouselActionType.RESET_CAROUSEL_DATA
  });
  const carouselData = {
    carousel_id
  }
  return axiosInstance('delete', `/app/delete-carousel`,carouselData)
    .then(res => res.data)
    .then(res => {
      if (res.success) {
        dispatch({
          type: carouselActionType.MERGE_CAROUSEL_DATA,
          data: res.data
        });
      }

      return res;
    });
};