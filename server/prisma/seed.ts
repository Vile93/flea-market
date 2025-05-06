import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: await hash('password', 10),
            name: 'Admin',
            phone: '+1234567890',
            role: Role.ROOT,
            avatar_path: null,
            username: 'admin',
        },
    });
}

main()
    .catch((err) => {
        console.error(err);
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .finally(async () => {
        await prisma.$disconnect();
    });
