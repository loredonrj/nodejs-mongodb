// Route Not Found Error Handler
export const notFound = (req, res, next) => {
    const error = new Error(`Route Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // Other Errors Handler
  
  export const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
     res.status(status);
    res.json({
      status: false,
      message: err?.message,
      stack: err?.stack,
    });
  };