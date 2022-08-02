function Transactions({ transactions }) {
  if (!transactions) {
    return (
      <div>
        <p className="heading">No transactions to display</p>
      </div>
    );
  }
  return (
    <div>
      <table className="table-auto">
        <thead className="uppercase text-left">
          <tr>
            <th className="py-3 px-6">Receipt no.</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            <tr key={transaction.id}>
              <td className="py-4 px-6 text-white">
                {transaction.receipt_number}
              </td>
              <td className="py-4 px-6">{transaction.transaction_date}</td>
              <td className="py-4 px-6">{transaction.phone_number}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
