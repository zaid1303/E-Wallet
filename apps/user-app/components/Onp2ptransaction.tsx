import { Card } from "@repo/ui/card"

export const Onp2ptransaction = ({
    transactions
}: {
    transactions: {
        timeStamp: Date,
        amount: number,
        toUserId:number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Devited Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Devited Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Devited INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timeStamp.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}