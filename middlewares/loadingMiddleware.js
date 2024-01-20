// loadingMiddleware.js
export const loadingMiddleware = (req, res, next) => {
    req.loading = true;
  
    console.log('Loading started...');
  
    // Simulate loading by delaying the response for 2 seconds
    setTimeout(() => {
      req.loading = false;
      next();
    }, 2000);
  };
  