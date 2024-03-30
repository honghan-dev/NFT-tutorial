import React from 'react'
import TransactionRow from './TransactionRow/TransactionRow'
import Link from 'next/link'

const Transactions = () => {
  return (
    <section>
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl">Transactions</h1>
        <Link href="/transactions">
          <span className="text-sm text-gray-600 underline">see all</span>
        </Link>
      </div>
      <TransactionRow />
    </section>
  )
}

export default Transactions