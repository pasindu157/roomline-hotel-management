export const userRedirectHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <!-- Automatically redirects to login after 3 seconds -->
      <meta http-equiv="refresh" content="3;url=http://localhost:5173/login" />
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f1f5f9;
          margin: 0;
        }
        .card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 420px;
        }
        h1 { color: #10b981; font-size: 24px; margin-bottom: 12px; }
        p { color: #64748b; font-size: 15px; margin-bottom: 24px; line-height: 1.5; }
        .btn {
          background-color: #2563eb;
          color: white;
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: background-color 0.2s;
        }
        .btn:hover { background-color: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✓ Email Verified!</h1>
        <p>Your email has been verified successfully. Redirecting you to the sign-in page in 3 seconds...</p>
        <a href="http://localhost:5173/login" class="btn">Go to Sign In</a>
      </div>
    </body>
  </html>
`;

export const hotelRedirecHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <!-- Automatically redirects to login after 3 seconds -->
      <meta http-equiv="refresh" content="3;url=http://localhost:5173/login" />
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f1f5f9;
          margin: 0;
        }
        .card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 420px;
        }
        h1 { color: #10b981; font-size: 24px; margin-bottom: 12px; }
        p { color: #64748b; font-size: 15px; margin-bottom: 24px; line-height: 1.5; }
        .btn {
          background-color: #2563eb;
          color: white;
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: background-color 0.2s;
        }
        .btn:hover { background-color: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✓ Email Verified!</h1>
        <p>Your email has been verified successfully. Redirecting you to the sign-in page in 3 seconds...</p>
        <a href="http://localhost:5173/login" class="btn">Go to Sign In</a>
      </div>
    </body>
  </html>
`;
