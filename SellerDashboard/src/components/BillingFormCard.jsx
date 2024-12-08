import { Input, Button} from "../index";

const BillingFormCard = () => {
  return (
    <section className="flex justify-center">
      <div className="container flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
        <div className="title">
          <h3>Billing Details</h3>
        </div>
        <form>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Input
                type="text"
                placeholder="Full Name"
                name="fullName"
                id="fullName"
              />
            </div>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <Input
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                id="cardNumber"
              />
            </div>
            <div>
              <label htmlFor="expiryDate">Expiry Date</label>
              <Input
                type="text"
                placeholder="MM/YY"
                name="expiryDate"
                id="expiryDate"
              />
            </div>
            <div>
              <label htmlFor="cvv">CVV</label>
              <Input
                type="text"
                placeholder="CVV"
                name="cvv"
                id="cvv"
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="billingAddress">Billing Address</label>
              <Input
                type="text"
                placeholder="Billing Address"
                name="billingAddress"
                id="billingAddress"
              />
            </div>
            <Button
              children="Save Billing Info"
              className="bg-primary-base py-p-xs rounded-md text-lg lg:col-span-2 text-white"
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default BillingFormCard