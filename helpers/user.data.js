import bcrypt from 'bcrypt';


const users = [
            {
                userName: 'John Doe',
                email: 'john.doe@example.com',
                password: bcrypt.hashSync('password123', 10),
                role: 'user'
            },
            {
                userName: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: bcrypt.hashSync('password456', 10),
                role: 'admin'
            }

        ]

export default users;