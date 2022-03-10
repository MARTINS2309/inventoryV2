module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c82a9f830c4e273dd404ddf4c5882e5f'),
  },
});
