const { User } = require('@xvectora/domain');

const user = new User({ 
  id: 1, 
  name: 'Test User', 
  email: 'test@example.com' 
});

user.validate();
console.log('User created:', user);