import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Image from "next/image";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}


export default async function () {
    const balance = await getBalance();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Welcome to your E Wallet!
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div >
                <Image  src="https://img.freepik.com/free-vector/e-wallet-concept-illustration_114360-7561.jpg?w=1060&t=st=1722770235~exp=1722770835~hmac=7f587689746bf03fbb632221ce7d7cdcb4ce7e76dc144fc0c9b72ca32fd203a1" alt="logo-image" width={500} height={500}/>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
        </div>
    </div>
}