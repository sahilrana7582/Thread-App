const { z } = require('zod');

exports.SchemaSignUp = z.object({
  username: z.string().min(1),
  email: z.string().email,
  password: z.string().min(4),
});
