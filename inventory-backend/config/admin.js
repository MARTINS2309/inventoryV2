module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1c174db903b383cb965be9f1939f5c1d'),
  },
});
