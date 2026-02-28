

import User from '../entities/user/user.model.js';
const seedUsers = async () => {
    try {
        const users = [
            {
                userName: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'user'
            },
            {
                userName: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'password456',
                role: 'admin'
            }
        ];
        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

export default seedUsers;