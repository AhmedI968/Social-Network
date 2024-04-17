import { prisma } from '../../lib/script';

export const suspendUser = async (user_id: any) => {
    prisma.user.update({
        where: { user_id },
        data: { status: "SUSPENDED" },
    });
}