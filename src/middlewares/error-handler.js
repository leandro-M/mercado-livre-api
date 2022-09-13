/**
 * @param {object} options
 * @param {number} options.defaultStatus Default status code. (Default: 400)
 */
export default function(options = { defaultStatus: 400 }) {
  return (error, req, res, next) =>
    res.status(error.status || options.defaultStatus).json({
      message: error.message,
    });
}
