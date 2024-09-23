import { Link } from "react-router-dom"


const PaymentPolicy = () => {
  return (
    
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-4">Payment Policy</h1>
            <p className="text-lg mb-4">
                Thank you for shopping with us! This Payment Policy explains the methods and terms of payment when purchasing products from our platform.
            </p>
            <h2 className="text-2xl font-semibold mb-2">1. Accepted Payment Methods</h2>
            <p className="mb-4">
                We accept the following payment methods:
                <ul className="list-disc pl-6">
                    <li>Credit Cards (Visa, MasterCard, American Express)</li>
                    <li>Debit Cards</li>
                    <li>PayPal</li>
                    <li>UPI Payments</li>
                    <li>Net Banking</li>
                    <li>Cash on delivery</li>
                </ul>
            </p>
            <h2 className="text-2xl font-semibold mb-2">2. Payment Security</h2>
            <p className="mb-4">
                We take the security of your payment information seriously. All transactions are encrypted and processed through secure payment gateways to ensure your data remains safe and private.
            </p>
            <h2 className="text-2xl font-semibold mb-2">3. Payment Confirmation</h2>
            <p className="mb-4">
                Once your payment is successfully processed, you will receive a confirmation email with the details of your order and a receipt for your payment.
            </p>
            <h2 className="text-2xl font-semibold mb-2">4. Failed or Declined Transactions</h2>
            <p className="mb-4">
                If your payment is declined or fails for any reason, please ensure that your payment information is correct and try again. You may also contact your bank or payment provider for further assistance.
            </p>
            <h2 className="text-2xl font-semibold mb-2">5. Refund Policy</h2>
            <p className="mb-4">
                In case of returns or cancellations, refunds will be processed in accordance with our <Link to="/policy" className="underline text-blue-600 hover:text-blue-800">Refund Policy</Link>. Refunds will be issued to the original payment method used during the purchase.
            </p>
            <h2 className="text-2xl font-semibold mb-2">6. Taxes and Fees</h2>
            <p className="mb-4">
                Any applicable taxes and transaction fees will be displayed at checkout. You are responsible for paying any additional taxes or fees that may apply to your purchase.
            </p>
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
            <p className="mb-4">
                If you have any questions or concerns regarding this Payment Policy, please contact our support team for assistance.
            </p>

    </div>
  )
}

export default PaymentPolicy