import React from 'react'

const TransactionRow = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl">Ethereum</div>
        <div className="">Buy</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">1 unit @ 100USD (4.71)</div>
        <div className="text-sm">RM 470</div>
      </div>
    </>
  )
}

export default TransactionRow