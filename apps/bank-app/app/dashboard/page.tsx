// BankTransactionsApprovalPage.jsx (Server Component)
import prisma from "@repo/db/client";
import { Card } from "@repo/ui/card";
import { AppbarClient } from "../components/AppbarClient";
import { TransactionItem } from "./TransactionItem"; // New client component

async function getOnRampTransactions() {
    const txns = await prisma.onRampTransaction.findMany({
        where: { status: "Processing" }
    });
    return txns.map(t => ({
        id: t.id,
        userid: t.userId,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        token: t.token
    }));
}

export default async function BankTransactionsApprovalPage() {
    const transactions = await getOnRampTransactions();
    
    return (
        <div className="min-h-screen bg-gray-50">
            <AppbarClient />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Card title="Bank Transfer Approval">
                    <div className="overflow-hidden shadow-sm rounded-lg">
                        {transactions.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                No pending transactions found
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <TransactionItem 
                                        key={transaction.id} 
                                        transaction={transaction} 
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}