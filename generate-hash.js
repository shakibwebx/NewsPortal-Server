const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter password to hash: ', async (password) => {
  if (!password) {
    console.log('❌ Password cannot be empty!');
    rl.close();
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  console.log('\n✅ Bcrypt Hash Generated:');
  console.log('─────────────────────────────────────────────────────────────');
  console.log(hash);
  console.log('─────────────────────────────────────────────────────────────');
  console.log('\nCopy this hash and paste it in MongoDB:');
  console.log('1. Open MongoDB Compass/Atlas');
  console.log('2. Go to ChannelDO database → users collection');
  console.log('3. Find the user you want to update');
  console.log('4. Edit the "password" field');
  console.log('5. Paste the hash above');
  console.log('6. Save\n');

  rl.close();
});
