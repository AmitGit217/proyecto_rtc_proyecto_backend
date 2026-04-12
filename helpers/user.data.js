import bcrypt from 'bcrypt';


const users = [
            {
                userName: 'John Doe',
                email: 'john.doe@example.com',
                password: await bcrypt.hash('password123', 10),
                role: 'user'
            },
            {
                userName: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: await bcrypt.hash('password456', 10),
                role: 'admin'
            }

        ]

export default users;