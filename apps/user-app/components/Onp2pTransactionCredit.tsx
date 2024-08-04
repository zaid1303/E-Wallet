import { Card } from "@repo/ui/card"

export const Onp2pTransactionCredit = ({
    transactions
}: {
    transactions: {
        timeStamp: Date,
        amount: number,
        fromUserId:number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Credit transaction">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Credit transaction">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Credit INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timeStamp.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}