import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendCard } from "../../../components/SendCard";
import { timeStamp } from "console";
import { Onp2ptransaction } from "../../../components/Onp2ptransaction";
import { Onp2pTransactionCredit } from "../../../components/Onp2pTransactionCredit";

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

async function getOnp2ptransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        timeStamp: t.timestamp,
        amount: t.amount,
        toUserId:t.toUserId
    }))
}


async function getOnp2ptransactionCredit() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        timeStamp: t.timestamp,
        amount: t.amount,
        fromUserId:t.fromUserId
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnp2ptransaction();
    const transactions2 = await getOnp2ptransactionCredit();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <Onp2ptransaction transactions={transactions} />
                    <Onp2pTransactionCredit  transactions={transactions2} />
                </div>
            </div>
        </div>
    </div>
}