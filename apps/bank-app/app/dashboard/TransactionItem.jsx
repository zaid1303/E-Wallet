// TransactionItem.jsx (Client Component)
'use client';

import { useState } from 'react';

export function TransactionItem({ transaction: t }) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(t.status);

    async function approveTransaction() {
        try {
            setIsLoading(true);
            const response = await fetch("/api/approved-transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    token: t.token, 
                    user_identifier: t.userid, 
                    amount: t.amount 
                })
            });
            if (response.ok) {
                setStatus("Approved");
            } else {
                alert("Failed to approve transaction");
            }
        } catch (error) {
            console.error("Error approving transaction:", error);
            alert("Error approving transaction");
        } finally {
            setIsLoading(false);
        }
    }

    async function declineTransaction() {
        try {
            setIsLoading(true);
            const response = await fetch("/api/decline-transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: t.token })
            });
            
            if (response.ok) {
                setStatus("Failure");
            } else {
                alert("Failed to decline transaction");
            }
        } catch (error) {
            console.error("Error declining transaction:", error);
            alert("Error declining transaction");
        } finally {
            setIsLoading(false);
        }
    }

    const statusColors = {
        Processing: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            border: "border-yellow-200"
        },
        Approved: {
            bg: "bg-green-100",
            text: "text-green-800",
            border: "border-green-200"
        },
        Failure: {
            bg: "bg-red-100",
            text: "text-red-800",
            border: "border-red-200"
        }
    };

    const statusStyle = statusColors[status] || statusColors.Processing;
    
    return (
        <li className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Left column - Transaction details */}
                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-medium text-indigo-700 truncate">
                            User ID: {t.userid}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                            {status}
                        </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {new Date(t.time).toLocaleString()}
                        </div>
                        <div className="hidden sm:block text-gray-300">•</div>
                        <div className="flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                            {t.provider}
                        </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-400 font-mono bg-gray-50 rounded px-2 py-1 overflow-x-auto">
                        <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1-1H6v-1h2l2 2h4a5 5 0 100-10H8a5 5 0 00-4.9 4H2a7 7 0 0114 0zm-7 4H6v-1h5v1z" clipRule="evenodd" />
                        </svg>
                        <span className="whitespace-nowrap">{t.token}</span>
                    </div>
                </div>
                
                {/* Right column - Amount and action buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 lg:mt-0">
                    <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-md border border-green-100">
                        + ₹{(t.amount / 100).toFixed(2)}
                    </div>
                    
                    {status === "Processing" && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={approveTransaction}
                                disabled={isLoading}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-0.5 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="-ml-0.5 mr-1.5 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Approve Transfer
                                    </>
                                )}
                            </button>
                            
                            <button
                                onClick={declineTransaction}
                                disabled={isLoading}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-0.5 mr-2 h-3 w-3 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="-ml-0.5 mr-1.5 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Decline
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}