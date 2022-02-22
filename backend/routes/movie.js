const { celebrate, Joi } = require('celebrate');
const movieRouter = require('express').Router();
const validator = require('validator');
const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movie');

movieRouter.get('/movies', getMovies);
movieRouter.delete(
  '/movies/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);
movieRouter.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидный url изображения');
      }),
      trailer: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидный url трейлера');
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидный thumbnail url');
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
module.exports = movieRouter;
