export default {
  port: 3500,
  dbURI: "mongodb://127.0.0.1:27017/shopeasy",
  baseURL: "http://localhost:3500/api/v1",
  clientURL: "http://localhost:5173/",
  smtp: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "harsh99gautam@gmail.com",
      pass: "weapurvzyeqfmrei",
    },
  },
  stripeSecret:
    "sk_test_51MYLsrSJiLl8mrlItGi7QsELmZwFIZabXf9s0C99veQIDWb6pYwGuic6SLhJbHV0Ubmfxh7B2iveXOoUBJEQWbxS00YMEs71GS",
};
