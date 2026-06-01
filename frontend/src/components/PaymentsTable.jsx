import employeeApi
from "../services/employeeApi";

export default function PaymentsTable({
  payments,
  reload,
}) {

  async function verify(id) {

    await employeeApi.put(
      `/employee/payments/${id}/verify`
    );

    reload();
  }

  async function reject(id) {

    const reason = prompt(
      "Reason for rejection"
    );

    if (!reason) return;

    await employeeApi.put(
      `/employee/payments/${id}/reject`,
      {
        reason,
      }
    );

    reload();
  }

  async function submit(id) {

    await employeeApi.put(
      `/employee/payments/${id}/swift`
    );

    reload();
  }

  return (
    <table
      border="1"
      cellPadding="10"
      width="100%"
    >
      <thead>
        <tr>
          <th>Payee</th>
          <th>Account</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>SWIFT</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {payments.map(
          (payment) => (
            <tr key={payment._id}>
              <td>
                {payment.payeeName}
              </td>

              <td>
                {
                  payment.payeeAccountNumber
                }
              </td>

              <td>
                {payment.amount}
              </td>

              <td>
                {payment.currency}
              </td>

              <td>
                {payment.swiftCode}
              </td>

              <td>
                {payment.status}
              </td>

              <td>
                {payment.status ===
                  "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        verify(
                          payment._id
                        )
                      }
                    >
                      Verify
                    </button>

                    <button
                      onClick={() =>
                        reject(
                          payment._id
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {payment.status ===
                  "Verified" && (
                  <button
                    onClick={() =>
                      submit(
                        payment._id
                      )
                    }
                  >
                    Submit SWIFT
                  </button>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}